"use client";
import { useConvex } from "convex/react";
import React, { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import SideNar from "./_components/SideNar";
import { FileListContext } from "@/app/_context/FilesListContext";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const convex = useConvex();
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const [fileList_, setFileList_] = useState();

  useEffect(() => {
    user && checkTeam();
  }, [user]);
  const checkTeam = async () => {
    const result = await convex.query(api.teams.getTeam, { email: user?.email || "" });
    if (!result?.length) {
      router.push("teams/create");
    }
  };
  return (
    <div>
      <FileListContext.Provider value={{ fileList_, setFileList_ }}>
        <div className="grid grid-cols-4">
          <div className=" h-screen  fixed">
            <SideNar />
          </div>
          <div className=" col-span-4 ml-72">{children}</div>
        </div>
      </FileListContext.Provider>
    </div>
  );
}

export default DashboardLayout;
