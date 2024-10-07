"use client";
import React, { useEffect, useState } from "react";
import SideNavTopSection, { TeamProps } from "./SideNavTopSection";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavBottomSection from "./SideNavBottomSection";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "@/hooks/use-toast";
import { useFileStore } from "@/store/useStore";

function SideNar() {
  const { user }: any = useKindeBrowserClient();
  const [activeTeam, setActiveTeam] = useState<TeamProps | any>();
  const totalFiles = useFileStore((state) => state.totalFiles);
  const setTotalFiles = useFileStore((state) => state.setTotalFiles);
  const setFileList = useFileStore((state) => state.setFileList);
  const createFile = useMutation(api.files.createFile);
  const convex = useConvex();

  useEffect(() => {
    activeTeam && getFiles();
  }, [activeTeam]);
  const onFileCreate = async (fileName: string) => {
    try {
      const resp = await createFile({
        fileName: fileName,
        teamId: activeTeam?._id,
        createdBy: user?.email,
        archive: false,
        document: "",
        whiteboard: "",
        fileChooseStatus: "canvas"
      });
      if (resp) {
        getFiles();
        toast({
          description: "创建文件成功！！！"
        });
      }
    } catch (error) {
      toast({
        description: "创建文件失败！！！"
      });
    }
  };
  const getFiles = async () => {
    try {
      const result: any = await convex.query(api.files.getFiles, {
        teamId: activeTeam?._id
      });
      console.log(result, 990000);
      if (result.success) {
        setFileList(result.data);
        setTotalFiles(result.data?.length);
      } else {
        setFileList([]);
        setTotalFiles(0);
      }
    } catch (error) {
      setFileList([]);
      setTotalFiles(0);
    }
  };

  return (
    <div
      className="h-screen 
    fixed w-72 borde-r border-[1px] p-6
    flex flex-col"
    >
      <div className="flex-1">
        <SideNavTopSection
          user={user}
          setActiveTeamInfo={(activeTeam: TeamProps) => setActiveTeam(activeTeam)}
        />
      </div>
      <div>
        <SideNavBottomSection totalFiles={totalFiles} onFileCreate={onFileCreate} />
      </div>
    </div>
  );
}

export default SideNar;
