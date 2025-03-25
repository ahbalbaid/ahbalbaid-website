import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl">About Me:</h2>
              <p className="mt-4 text-gray-600">
                I am a computer science student at Texas A&M University who is
                passionate about developing new technologies and businesses. I
                have experience developing applications, doing scientific
                research, and developing operational strategies. In my
                internships, I built full stack web applications with React,
                NodeJS, Typescript, and MySQL. As a research assistant, I built
                algorithms that used the ROS system to test Lidar, camera, CCD,
                CMOS, and other sensors. Feel free to contact me if you want to
                talk about technology, business, or anything else!!
              </p>
              <Button
                asChild
                className="mt-8 inline-flex items-center justify-center rounded bg-gray-900 hover:bg-gray-600 px-12 py-3 text-sm font-medium text-white transition text-center"
              >
                <a href="mailto:abdullah167812@gmail.com">Contact Me</a>
              </Button>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative h-72 w-72 sm:h-80 sm:w-80 lg:h-96 lg:w-96 overflow-hidden rounded-lg">
                <Image
                  src="/images/Baldaid_Abdullah.jpg"
                  alt="Abdullah Balbaid"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Things I can do in tech:
            </h2>
            <p className="mt-4 text-gray-300">
              Explore my portfolio of technical capabilities, from software
              development to data analysis. This section highlights the diverse
              range of projects and skills I&apos;ve developed and honed
              throughout my career in technology.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-gray-500/10 hover:shadow-gray-500/10 bg-gray-800">
              <Link href="/qualifications#software-engineering">
                <div className="flex flex-col h-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                  <h2 className="mt-4 text-xl font-bold text-white">
                    Software Engineering
                  </h2>
                  <p className="mt-1 text-sm text-gray-300">
                    I apply engineering principles to design, develop, and
                    maintain software. My approach combines strong technical
                    skills with best practices in project management, ensuring
                    robust and scalable software solutions.
                  </p>
                </div>
              </Link>
            </Card>

            <Card className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-gray-500/10 hover:shadow-gray-500/10 bg-gray-800">
              <Link href="/qualifications#database-design">
                <div className="flex flex-col h-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
                    />
                  </svg>
                  <h2 className="mt-4 text-xl font-bold text-white">
                    Database Design and Management
                  </h2>
                  <p className="mt-1 text-sm text-gray-300">
                    I specialize in creating efficient databases tailored to
                    meet specific data needs. My expertise covers everything
                    from schema design in SQL and NoSQL systems to ensuring
                    optimal data retrieval and storage.
                  </p>
                </div>
              </Link>
            </Card>

            <Card className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-gray-500/10 hover:shadow-gray-500/10 bg-gray-800">
              <Link href="/qualifications#machine-learning">
                <div className="flex flex-col h-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                  <h2 className="mt-4 text-xl font-bold text-white">
                    Machine Learning and Artificial Intelligence
                  </h2>
                  <p className="mt-1 text-sm text-gray-300">
                    With a strong foundation in machine learning and AI, I
                    develop systems that can learn from data and improve over
                    time. My projects range from predictive models to AI-driven
                    applications, leveraging data to solve real-world problems.
                  </p>
                </div>
              </Link>
            </Card>

            <Card className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-gray-500/10 hover:shadow-gray-500/10 bg-gray-800">
              <Link href="/qualifications#project-managment">
                <div className="flex flex-col h-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                    />
                  </svg>
                  <h2 className="mt-4 text-xl font-bold text-white">
                    Project Management
                  </h2>
                  <p className="mt-1 text-sm text-gray-300">
                    I lead projects from concept through completion, focusing on
                    efficient resource management, timely delivery, and meeting
                    all project goals. My management style enhances team
                    productivity and drives successful outcomes.
                  </p>
                </div>
              </Link>
            </Card>

            <Card className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-gray-500/10 hover:shadow-gray-500/10 bg-gray-800">
              <Link href="/qualifications#cloud-computing">
                <div className="flex flex-col h-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z"
                    />
                  </svg>
                  <h2 className="mt-4 text-xl font-bold text-white">
                    Cloud Computing
                  </h2>
                  <p className="mt-1 text-sm text-gray-300">
                    I harness the power of cloud computing to deploy scalable
                    applications that efficiently handle data and operations. My
                    expertise includes working with leading cloud platforms like
                    AWS and Azure, optimizing cloud resources for maximum
                    performance.
                  </p>
                </div>
              </Link>
            </Card>

            <Card className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-gray-500/10 hover:shadow-gray-500/10 bg-gray-800">
              <Link href="/qualifications#algorithm-design">
                <div className="flex flex-col h-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                    />
                  </svg>
                  <h2 className="mt-4 text-xl font-bold text-white">
                    Algorithm Design
                  </h2>
                  <p className="mt-1 text-sm text-gray-300">
                    I excel in designing algorithms that streamline and solve
                    complex problems efficiently. My skill set includes
                    analyzing requirements, crafting solutions, and implementing
                    algorithms that improve data processing and functionality.
                  </p>
                </div>
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
