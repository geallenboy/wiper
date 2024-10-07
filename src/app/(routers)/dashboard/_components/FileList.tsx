import { useRouter } from "next/navigation";
import Image from "next/image";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Archive, DeleteIcon, MoreHorizontal } from "lucide-react";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "@/hooks/use-toast";
import { useFileStore } from "@/store/useStore";

export interface fileListProps {
  archive: boolean;
  createdBt: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: string;
  _creationTime: number;
  fileChooseStatus: string;
}

function FileList() {
  const { user }: any = useKindeBrowserClient();
  const delFileById = useMutation(api.files.delFileById);
  const setTotalFiles = useFileStore((state) => state.setTotalFiles);
  const fileList = useFileStore((state) => state.fileList);
  const setFileList = useFileStore((state) => state.setFileList);
  const teamId = useFileStore((state) => state.teamId);
  const convex = useConvex();

  const router = useRouter();
  useEffect(() => {
    fileList && setFileList(fileList);
  }, [fileList]);

  const getFileDel = async (id: any) => {
    try {
      const { message } = await delFileById({ _id: id });
      toast({
        description: message
      });
      getFiles();
    } catch (error) {
      console.log("删除失败");
    }
  };
  const getFiles = async () => {
    try {
      const result: any = await convex.query(api.files.getFiles, {
        teamId: teamId
      });
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
    <div className="mt-10">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">文件名称</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">创建时间</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">编辑时间</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">作者</td>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {fileList &&
              fileList.map((file: fileListProps, index: number) => (
                <tr key={index} className="odd:bg-gray-50 ">
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {file.fileName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {dayjs(file._creationTime).format("YYYY-MM-DD")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {dayjs(file._creationTime).format("YYYY-MM-DD")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {user && (
                      <Image
                        src={"/unnamed.png"}
                        alt="user"
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex gap-3">
                        {/* <div
                          onClick={() => router.push("/workspace/" + file._id)}
                          className="text-gray-700"
                        >
                          编辑
                        </div> */}
                        <MoreHorizontal />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          className="gap-3"
                          onClick={() => router.push("/workspace/" + file._id)}
                        >
                          <Archive className="h-4 w-4" /> 编辑
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-3" onClick={() => getFileDel(file._id)}>
                          <DeleteIcon className="h-4 w-4" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FileList;
