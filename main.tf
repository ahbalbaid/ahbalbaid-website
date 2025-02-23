terraform {
  cloud {
    organization = "ahbalbaid"
    workspaces {
      name = "personal-website"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = var.aws_region
}

# S3
resource "aws_s3_bucket" "website_bucket" {
  bucket        = "${var.bucket_prefix}.${var.domain_name}"
  force_destroy = true

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}

resource "aws_s3_bucket_policy" "website_bucket_policy" {
  bucket = aws_s3_bucket.website_bucket.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid       = "PublicReadGetObject",
        Effect    = "Allow",
        Principal = "*",
        Action    = "s3:GetObject",
        Resource  = "arn:aws:s3:::${var.bucket_prefix}.${var.domain_name}/*"
      }
    ]
  })
}

# ROUT53 + ACM
resource "aws_acm_certificate" "certificate" {
  domain_name               = var.domain_name
  validation_method         = "DNS"
  subject_alternative_names = ["*.${var.domain_name}"]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_zone" "primary" {
  name = var.domain_name
}

resource "aws_route53_record" "certificate_validation" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = tolist(aws_acm_certificate.certificate.domain_validation_options)[0].resource_record_name
  type    = tolist(aws_acm_certificate.certificate.domain_validation_options)[0].resource_record_type
  records = [tolist(aws_acm_certificate.certificate.domain_validation_options)[0].resource_record_value]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "certificate_validation" {
  certificate_arn         = aws_acm_certificate.certificate.arn
  validation_record_fqdns = [aws_route53_record.certificate_validation.fqdn]
}

# CloudFront
resource "aws_cloudfront_distribution" "website_distribution" {
  origin {
    domain_name = aws_s3_bucket.website_bucket.bucket_regional_domain_name
    origin_id   = "s3-origin"
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = [
    "${var.bucket_prefix}.${var.domain_name}",
    var.domain_name,
    "*.${var.domain_name}"
  ]

  default_cache_behavior {
    target_origin_id       = "s3-origin"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    cache_policy_id        = "658327ea-f89d-4fab-a63d-7e88639e58f6"
    compress               = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.certificate.arn
    ssl_support_method  = "sni-only"
  }
}

resource "aws_route53_record" "website_record" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = var.domain_name
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.website_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.website_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_s3_bucket" "artifact_bucket" {
  bucket = "${var.domain_name}-artifact-bucket"
}

# CodePipeline + CodeBuild
resource "aws_iam_role" "codepipeline_role" {
  name = "codepipeline-role-${var.domain_name}"
  assume_role_policy = jsonencode({
    Version   = "2012-10-17",
    Statement = [{
      Effect    = "Allow",
      Principal = { Service = "codepipeline.amazonaws.com" },
      Action    = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy" "codepipeline_policy" {
  name = "codepipeline-policy-${var.domain_name}"
  role = aws_iam_role.codepipeline_role.id
  policy = jsonencode({
    Version   = "2012-10-17",
    Statement = [{
      Effect   = "Allow",
      Action   = [
        "s3:*",
        "codebuild:BatchGetBuilds",
        "codebuild:StartBuild",
        "iam:PassRole"
      ],
      Resource = "*"
    }]
  })
}

resource "aws_iam_role" "codebuild_role" {
  name = "codebuild-role-${var.domain_name}"
  assume_role_policy = jsonencode({
    Version   = "2012-10-17",
    Statement = [{
      Effect    = "Allow",
      Principal = { Service = "codebuild.amazonaws.com" },
      Action    = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy" "codebuild_policy" {
  name = "codebuild-policy-${var.domain_name}"
  role = aws_iam_role.codebuild_role.id
  policy = jsonencode({
    Version   = "2012-10-17",
    Statement = [
      {
        Effect   = "Allow",
        Action   = [
          "cloudfront:CreateInvalidation",
          "s3:GetObject",
          "s3:PutObject",
          "s3:GetObjectVersion",
          "s3:ListBucket"
        ],
        Resource = "*"
      },
      {
        Effect   = "Allow",
        Action   = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Resource = "*"
      }
    ]
  })
}

resource "aws_codebuild_project" "invalidate_cache" {
  name         = "invalidate-cloudfront-cache"
  service_role = aws_iam_role.codebuild_role.arn

  artifacts {
    type = "NO_ARTIFACTS"
  }

  environment {
    compute_type = "BUILD_GENERAL1_SMALL"
    image        = "aws/codebuild/standard:5.0"
    type         = "LINUX_CONTAINER"

    environment_variable {
      name  = "DISTRIBUTION_ID"
      value = aws_cloudfront_distribution.website_distribution.id
    }
  }

  source {
    type      = "NO_SOURCE"
    buildspec = <<EOF
version: 0.2

phases:
  build:
    commands:
      - aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"
EOF
  }
}

resource "aws_codepipeline" "pipeline" {
  name     = "${var.domain_name}-pipeline"
  role_arn = aws_iam_role.codepipeline_role.arn

  artifact_store {
    type     = "S3"
    location = aws_s3_bucket.artifact_bucket.bucket
  }

  stage {
    name = "Source"
    action {
      name             = "Source"
      category         = "Source"
      owner            = "ThirdParty"
      provider         = "GitHub"
      version          = "1"
      output_artifacts = ["source_output"]

      configuration = {
        Owner      = var.github_owner
        Repo       = var.github_repo
        Branch     = var.github_branch
        OAuthToken = var.github_token
      }
    }
  }

  stage {
    name = "Deploy"
    action {
      name            = "Deploy"
      category        = "Deploy"
      owner           = "AWS"
      provider        = "S3"
      version         = "1" 
      input_artifacts = ["source_output"]
      configuration = {
        BucketName = aws_s3_bucket.website_bucket.bucket
        Extract    = "true"
      }
    }
  }

  stage {
    name = "InvalidateCache"
    action {
      name            = "InvalidateCache"
      category        = "Build"
      owner           = "AWS"
      provider        = "CodeBuild"
      version         = "1" 
      input_artifacts = ["source_output"]
      configuration = {
        ProjectName = aws_codebuild_project.invalidate_cache.name
      }
    }
  }
}
