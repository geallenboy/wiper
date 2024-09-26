import { MAX_FREE_FILE } from "@/_constant/Constant";
import { Archive, Flag, Github } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PricingDialog from "./PricingDialog";

function SideNavBottomSection({ onFileCreate, totalFiles }: any) {
  const menuList = [
    // {
    //   id: 1,
    //   name: "开始",
    //   icon: Flag,
    //   path: ""
    // },
    {
      id: 2,
      name: "Github",
      icon: Github,
      path: "https://github.com/geallenboy/wiper"
    }
    // {
    //   id: 3,
    //   name: "档案",
    //   icon: Archive,
    //   path: ""
    // }
  ];

  const [fileInput, setFileInput] = useState("");

  return (
    <div>
      {menuList.map((menu, index) => {
        return (
          <a
            href={menu.path}
            key={index + "menu"}
            className="flex gap-2 p-1 px-2 text-[14px] hover:bg-gray-100 rounded-md cursor-pointer"
            target="_blank"
          >
            <menu.icon className="h-5 w-5" />
            {menu.name}
          </a>
        );
      })}

      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="w-full bg-blue-600 
      hover:bg-blue-700 justify-start mt-3"
          >
            新建文件
          </Button>
        </DialogTrigger>
        {totalFiles < MAX_FREE_FILE ? (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>创建新文件</DialogTitle>
              <DialogDescription>
                <Input
                  placeholder="输入文件名称"
                  className="mt-3"
                  onChange={(e) => setFileInput(e.target.value)}
                />
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  className="bg-blue-600
            hover:bg-blue-700"
                  disabled={!(fileInput && fileInput.length > 3)}
                  onClick={() => onFileCreate(fileInput)}
                >
                  创建
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        ) : (
          <PricingDialog />
        )}
      </Dialog>
      <div className="h-4 w-full bg-gray-200 rounded-full mt-5">
        <div
          className={`h-4  bg-blue-600 rounded-full`}
          style={{ width: `${(totalFiles / 5) * 100}%` }}
        ></div>
      </div>

      <h2 className="text-[12px] mt-3">
        <strong>{totalFiles}</strong> 共使用 <strong>{MAX_FREE_FILE}</strong> 个文件
      </h2>
      <h2 className="text-[12px] mt-1">升级您的计划即可获得无限制访问权限。</h2>
    </div>
  );
}

export default SideNavBottomSection;
