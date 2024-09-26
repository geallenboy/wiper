"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { useEffect } from "react";

export default function Home() {
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
}
