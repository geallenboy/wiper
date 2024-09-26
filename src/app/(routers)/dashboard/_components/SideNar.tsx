"use client";
import React, { useContext, useEffect, useState } from "react";
import SideNavTopSection, { TeamProps } from "./SideNavTopSection";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavBottomSection from "./SideNavBottomSection";
import { FileListContext } from "@/app/_context/FilesListContext";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getFiles } from "@/convex/files";
import { toast } from "@/hooks/use-toast";

function SideNar() {
  const { user }: any = useKindeBrowserClient();
  const [activeTeam, setActiveTeam] = useState<TeamProps | any>();
  const [totalFiles, setTotalFiles] = useState<Number>();
  const { fileList_, setFileList_ } = useContext(FileListContext);
  const createFile = useMutation(api.files.createFile);
  const convex = useConvex();

  useEffect(() => {
    activeTeam && getFiles();
  }, [activeTeam]);
  const onFileCreate = (fileName: string) => {
    createFile({
      fileName: fileName,
      teamId: activeTeam?._id,
      createdBy: user?.email,
      archive: false,
      document: "",
      whiteboard: ""
    }).then(
      (resp) => {
        if (resp) {
          getFiles();
          toast({
            description: "创建文件成功！！！"
          });
        }
      },
      (e) => {
        toast({
          description: "创建文件失败！！！"
        });
      }
    );
  };
  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles, {
      teamId: activeTeam?._id
    });
    console.log(result, "result");
    setFileList_(result);
    setTotalFiles(result?.length);
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
