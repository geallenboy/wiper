"use client";
import React, { useEffect, useState } from "react";
import { LayoutGrid, LogOut, Settings, Users } from "lucide-react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Separator } from "@/components/ui/separator";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFileStore } from "@/store/useStore";
export interface TeamProps {
  createdBy: String;
  teamName: String;
  _id: String;
}
function SideNavTopSection({ user, setActiveTeamInfo }: any) {
  const router = useRouter();
  const convex = useConvex();
  const [activeTeam, setActiveTeam] = useState<TeamProps>();
  const [teamList, setTeamList] = useState<TeamProps[]>();

  const setTeamId = useFileStore((state) => state.setTeamId);
  const menu = [
    {
      id: 1,
      name: "创建团队",
      path: "/teams/create",
      icon: Users
    },
    {
      id: 2,
      name: "设置",
      path: "",
      icon: Settings
    },
    {
      id: 3,
      name: "退出",
      path: "",
      icon: LogOut
    }
  ];
  useEffect(() => {
    user && getTeamList();
  }, [user]);

  useEffect(() => {
    activeTeam ? setActiveTeamInfo(activeTeam) : "null";
  }, [activeTeam]);

  const getTeamList = async () => {
    try {
      const result = await convex.query(api.teams.getTeam, { email: user?.email });
      if (result.success) {
        setTeamList(result.data);
        setActiveTeam(result.data[0]);
        setTeamId(result.data[0]?._id || "");
      } else {
        setTeamList([]);
        setActiveTeam({ createdBy: "", teamName: "", _id: "" });
        setTeamId("");
      }
    } catch (error) {
      setTeamList([]);
      setActiveTeam({ createdBy: "", teamName: "", _id: "" });
      setTeamId("");
    }
  };
  const onMenuClick = (item: any) => {
    if (item.path) {
      router.push(item.path);
    }
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <div className="flex items-center gap-3hover:bg-slate-200 p-3 rounded-lg cursor-pointer">
            <Image src={"/logo.svg"} width={40} height={40} alt="logo" />
            <h2 className="flex gap-2 items-center font-bold text-[17px]">
              {activeTeam?.teamName} <ChevronDownIcon />
            </h2>
          </div>
        </PopoverTrigger>
        <PopoverContent className="ml-7 p-4">
          <div>
            {teamList?.map((team, index) => {
              return (
                <h2
                  key={index + "teamList"}
                  className={cn(
                    "p-2 hover:bg-blue-500 hover:text-white rounded-lg mb-1 cursor-pointer",
                    activeTeam?._id == team._id && "bg-blue-500 text-white"
                  )}
                  onClick={() => setActiveTeam(team)}
                >
                  {team.teamName}
                </h2>
              );
            })}
          </div>
          <Separator className="mt-2 bg-slate-100" />
          <div>
            {menu.map((item, index) => {
              if (item.id === 3) {
                return (
                  <LogoutLink key={index + "x"}>
                    <h2
                      key={index}
                      className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm"
                      onClick={() => onMenuClick(item)}
                    >
                      <item.icon />
                      {item.name}
                    </h2>
                  </LogoutLink>
                );
              }
              return (
                <Link
                  href={item.path}
                  key={index}
                  className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm"
                >
                  <item.icon />
                  {item.name}
                </Link>
              );
            })}
          </div>
          <Separator className="mt-2 bg-slate-100" />

          {user && (
            <div className="mt-2 flex gap-2 items-center">
              <Image
                src={"/unnamed.png"}
                alt="user"
                width={30}
                height={30}
                className="rounded-full"
              />

              <div>
                <h2 className="text-[14px] font-bold">
                  {user?.given_name}
                  {user?.family_name}
                </h2>
                <h2 className="text-[12px] text-gray-500">{user?.email}</h2>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
      <Button variant={"outline"} className="w-full justify-start gap-2 font-bold mt-8 bg-gray-100">
        <LayoutGrid className="h-5 w-5" />
        所有文件
      </Button>
    </div>
  );
}

export default SideNavTopSection;
