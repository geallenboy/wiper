"use client";
import Header from "@/app/_components/Header";

const About = () => {
  return (
    <div>
      <Header />
      <div className="bg-gray-50 h-screen  px-4 py-32 lg:py-16 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-extrabold sm:text-5xl">打造最优秀的工程团队协作工具 </h2>
        <h3 className="text-2xl font-extrabold text-gray-500 sm:block mt-3">
          致力于开新一代AI工具。
        </h3>
      </div>
    </div>
  );
};

export default About;
