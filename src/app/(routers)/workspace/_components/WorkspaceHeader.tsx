"use client";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Link, Save } from "lucide-react";
import Image from "next/image";

function WorkspaceHeader({ onSave, value, onValueChange, fileName }: any) {
  return (
    <div className="p-3 border-b flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Image src={"/logo.svg"} alt="logo" height={40} width={40} />
        <h2>{fileName}</h2>
      </div>
      <ToggleGroup type="single" value={value} onValueChange={onValueChange}>
        <ToggleGroupItem value="canvas">画板</ToggleGroupItem>
        <ToggleGroupItem value="document">文档</ToggleGroupItem>

        <ToggleGroupItem value="both">两者</ToggleGroupItem>
      </ToggleGroup>
      <div className="flex items-center gap-4">
        <Button
          className="h-8 text-[12px]
    gap-2 bg-yellow-500 hover:bg-yellow-600"
          onClick={() => onSave()}
        >
          <Save className="h-4 w-4" /> 保存
        </Button>
        <Button
          className="h-8 text-[12px]
    gap-2 bg-blue-600 hover:bg-blue-700"
        >
          分享 <Link className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default WorkspaceHeader;
