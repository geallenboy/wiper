import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Send } from "lucide-react";
import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div className="flex justify-end w-full gap-2 items-center">
      <div className="flex gap-2 items-center  rounded-md p-1">
        <Input type="text" placeholder="搜索" />
        <Search className="h-4 w-4 " />
      </div>
      <div>
        <Image src={"/unnamed.png"} alt="user" width={30} height={30} className="rounded-full" />
      </div>
      <Button
        className="gap-2 flex text-sm h-8 hover:bg-blue-700 bg-blue-600
  "
      >
        <Send className="h-4 w-4" /> 邀请
      </Button>
    </div>
  );
}

export default Header;
