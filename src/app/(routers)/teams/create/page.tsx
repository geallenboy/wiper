"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

function CreateTeams() {
  const [teamName, setTeamName] = useState("");
  const createTeam = useMutation(api.teams.createTeam);
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const createNewTeam = () => {
    createTeam({
      teamName: teamName,
      createdBy: user?.email || ""
    }).then((resp) => {
      if (resp) {
        toast({
          description: "团队创建成功！！！"
        });
        router.push("/dashboard");
      } else {
        toast({
          variant: "destructive",
          description: "团队创建失败！！！"
        });
      }
    });
  };
  return (
    <div className="px-6 md:px-16 my16">
      <div className="flex items-center">
        <Image src="/logo.svg" alt="logo" width={80} height={80} />
        <h1 className="text-[30px] text-black font-sans font-bold">wiper</h1>
      </div>
      <div className="flex flex-col items-center mt-8">
        <h2 className="font-bold text-[40px] py-3">我们该如何称呼你的团队？</h2>
        <h2 className="text-gray-500">您稍后可以随时通过设置进行更改</h2>
        <div className="mt-7 w-[40%]">
          <label className="text-gray-500">团队名称</label>
          <Input
            onChange={(e) => setTeamName(e.target.value)}
            className="mt-3"
            placeholder="输入团队名称"
          />
        </div>
        <Button
          disabled={!(teamName && teamName?.length > 0)}
          onClick={() => createNewTeam()}
          className="bg-blue-500 mt-9 hover:bg-blue-700"
        >
          创建团队
        </Button>
      </div>
    </div>
  );
}

export default CreateTeams;
