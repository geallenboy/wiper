"use client";
import { useConvex } from "convex/react";
import React, { useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import SideNar from "./_components/SideNar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const convex = useConvex();
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  useEffect(() => {
    user && checkTeam();
  }, [user]);
  const checkTeam = async () => {
    try {
      const result = await convex.query(api.teams.getTeam, { email: user?.email || "" });
      if (!result.data?.length) {
        router.push("teams/create");
      }
    } catch (error) {}
  };
  return (
    <div className="grid grid-cols-4">
      <div className=" h-screen  fixed">
        <SideNar />
      </div>
      <div className=" col-span-4 ml-72">{children}</div>
    </div>
  );
}

export default DashboardLayout;
