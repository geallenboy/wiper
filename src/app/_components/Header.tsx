import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { LogOut } from "lucide-react";

function Header() {
  const { user }: any = useKindeBrowserClient();

  return (
    <header className="bg-black ">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center text-white">
          <Image alt="logo" src="./logo.svg" width={60} height={60} />
          <span className="ml-2 font-bold font-sans text-xl">wiper</span>
        </div>

        <div className="flex flex-1 items-center justify-end md:justify-between ml-10">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-base">
              <li>
                <Link className="text-white transition hover:text-white/75 text-" href="/">
                  首页
                </Link>
              </li>

              <li>
                <Link className="text-white transition hover:text-white/75" href="/templates">
                  模板
                </Link>
              </li>
              <li>
                <Link className="text-white transition hover:text-white/75" href="/ai">
                  AI
                </Link>
              </li>
              <li>
                <Link className="text-white transition hover:text-white/75" href="/about">
                  关于
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {user == null ? (
              <div className="sm:flex sm:gap-4">
                <LoginLink
                  postLoginRedirectURL="/dashboard"
                  className="block rounded-md  px-5 py-2.5 text-sm font-medium text-white transition "
                >
                  登录
                </LoginLink>
                <RegisterLink
                  postLoginRedirectURL="/welcome"
                  className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-black-600 transition hover:text-black-600/75 sm:block"
                >
                  注册
                </RegisterLink>
              </div>
            ) : (
              <div className="flex items-center text-white gap-2 cursor-pointer">
                <Image
                  src={"/unnamed.png"}
                  alt="user"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <h2 className="text-[14px] font-bold">
                  {user?.given_name}
                  {user?.family_name}
                </h2>
                <LogoutLink>
                  <h2 className="flex gap-2 items-center p-2 rounded-lg cursor-pointer text-sm">
                    <LogOut className="w-4 h-4" />
                    退出
                  </h2>
                </LogoutLink>
              </div>
            )}

            <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
              <span className="sr-only">切换菜单</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
