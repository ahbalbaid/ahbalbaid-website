import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function PortfolioPage() {
  return (
    <main>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">My Work</h1>
            <p className="mt-4 sm:text-xl/relaxed">
              Explore my projects and initiatives showcasing my commitment to
              innovative solutions and creative problem-solving.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="lg:py-24">
              <h2 className="text-3xl font-bold sm:text-4xl">Sharetea Shop</h2>
              <p className="mt-4 text-gray-600">
                Launched a user-friendly, all-in-one business solution designed
                to improve customer interaction and sales management. The
                platform integrates multiple advanced technologies, including
                Auth0 for authentication, Google Cloud for robust cloud
                computing, translation and accessibility tools for better user
                inclusivity, and AWS for scalable cloud infrastructure,
                enhancing overall functionality and user experience.
              </p>
              <Button
                asChild
                className="mt-8 inline-block rounded bg-gray-900 hover:bg-gray-600 px-12 py-3 text-sm font-medium text-white transition"
              >
                <a
                  href="https://sharetea.shop/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit the shop
                </a>
              </Button>
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-full">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/x7QsUcpq4o4?si=YkOX9SGP41Lxy1wK"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 w-full h-full object-cover"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-full">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/3AEwcdwQle4?si=VeLDoJurSWgBKiau"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 w-full h-full object-cover"
              ></iframe>
            </div>
            <div className="lg:py-24">
              <h2 className="text-3xl font-bold sm:text-4xl">BullRun App</h2>
              <p className="mt-4 text-gray-600">
                Developed a trading education app designed to simplify the
                learning process through the analysis of historical data. The
                app enhances beginner trading experiences by integrating AI
                technology, which provides insightful stock market analysis.
                This integration allows users to gain a deeper understanding of
                trading patterns and market behavior, significantly improving
                their trading skills and decision-making abilities.
              </p>
              <Button
                asChild
                className="mt-8 inline-block rounded bg-gray-900 hover:bg-gray-600 px-12 py-3 text-sm font-medium text-white transition"
              >
                <a
                  href="https://devpost.com/software/bullrun"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Devpost
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="lg:py-24">
              <h2 className="text-3xl font-bold sm:text-4xl">Catapult Web</h2>
              <p className="mt-4 text-gray-600">
                Enhanced travel planning by developing a web-scraping API using
                Flask, which achieves personalized travel recommendations from
                over 100 countries. Additionally, I boosted the user experience
                by designing a responsive interface with React, which
                categorizes updates to improve engagement and interaction. This
                combination of technologies ensures that users receive tailored
                travel advice, making it easier to plan trips with up-to-date
                and relevant information.
              </p>
              <Button
                asChild
                className="mt-8 inline-block rounded bg-gray-900 hover:bg-gray-600 px-12 py-3 text-sm font-medium text-white transition"
              >
                <a
                  href="https://devpost.com/software/catapult-mcni5z"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Devpost
                </a>
              </Button>
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-full">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/bJJ34wLLXoU?si=3DhOV9ttELAK96s-"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 w-full h-full object-cover"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-full">
              <div className="absolute rounded inset-0 w-full h-full flex items-center justify-center">
                <Image
                  src="/images/Data.png"
                  alt="Data visualization"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="lg:py-24">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Embedding Crackers
              </h2>
              <p className="mt-4 text-gray-600">
                Secured third place in the Bloomberg Challenge by employing
                advanced machine learning techniques with Python and
                Scikit-learn to predict the content of unseen embedded articles.
                Additionally, I designed a topic modeling algorithm that
                effectively extracts keywords from these articles. This
                algorithm uses clustering, neural networks, and encode-decode
                techniques, implemented using Pandas, Numpy, and Scikit-learn.
                These efforts showcase the application of sophisticated data
                science techniques to enhance understanding and information
                retrieval from textual data.
              </p>
              <Button
                asChild
                className="mt-8 inline-block rounded bg-gray-900 hover:bg-gray-600 px-12 py-3 text-sm font-medium text-white transition"
              >
                <a
                  href="https://devpost.com/software/bloomberg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Devpost
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
