"use client";
import React, { useEffect, useState } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import Editor from "../_components/Editor";
import { useConvex, useMutation } from "convex/react";
import { fileListProps } from "../../dashboard/_components/FileList";
import { api } from "@/convex/_generated/api";
import Canvas from "../_components/Canvas";
import { cn } from "@/lib/utils";

function Workspace({ params }: any) {
  const [triggerSave, setTriggerSave] = useState(false);
  const updateFileChooseStatus = useMutation(api.files.updateFileChooseStatus);
  const [value, setValue] = useState("");
  const convex = useConvex();
  const [fileData, setFileData] = useState<fileListProps | any>();
  useEffect(() => {
    params.fileId && getFileData();
  }, [params.fileId]);
  const getFileData = async () => {
    const result = await convex.query(api.files.getFileById, { _id: params.fileId });

    if (result.success && result.data) {
      setFileData(result.data);
      setValue(result.data.fileChooseStatus);
    } else {
      setFileData(null);
    }
  };
  const onValueChange = async (val: string) => {
    try {
      setValue(val);
      await updateFileChooseStatus({
        _id: params.fileId,
        fileChooseStatus: val
      });
    } catch (error) {}
  };

  return (
    <div>
      <WorkspaceHeader
        value={value}
        fileName={fileData?.fileName}
        onValueChange={onValueChange}
        onSave={() => setTriggerSave(!triggerSave)}
      />
      <div
        className={cn(
          "grid",
          value === "document" || value === "canvas" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
        )}
      >
        {value === "document" || value === "both" ? (
          <div className=" h-screen ">
            <Editor onSaveTrigger={triggerSave} fileId={params.fileId} fileData={fileData} />
          </div>
        ) : (
          ""
        )}
        {value === "canvas" || value === "both" ? (
          <div className=" h-screen border-l">
            <Canvas onSaveTrigger={triggerSave} fileId={params.fileId} fileData={fileData} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Workspace;
