import React from "react";
import Link from "next/link";

function Hero() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:py-2 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            工程团队协作工具
            <strong className="font-extrabold text-red-700 sm:block mt-3"> 文档和画板</strong>
          </h1>
          <p className="mt-4 sm:text-xl/relaxed">
            一体化 Markdown 编辑器、协作画布和图表即代码构建器
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="/dashboard"
            >
              立即开始
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
