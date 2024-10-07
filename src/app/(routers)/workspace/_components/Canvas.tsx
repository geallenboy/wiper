"use client";
import React, { useEffect, useState } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { fileListProps } from "../../dashboard/_components/FileList";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "@/hooks/use-toast";

function Canvas({
  onSaveTrigger,
  fileId,
  fileData
}: {
  onSaveTrigger: any;
  fileId: any;
  fileData: fileListProps;
}) {
  const [whiteBoardData, setWhiteBoardData] = useState<any>();
  const updateWhiteboard = useMutation(api.files.updateWhiteboard);
  useEffect(() => {
    saveWhiteboard();
  }, [onSaveTrigger]);

  const saveWhiteboard = async () => {
    try {
      await updateWhiteboard({
        _id: fileId,
        whiteboard: JSON.stringify(whiteBoardData)
      });
      toast({
        description: "画板更新成功!"
      });
    } catch (error) {
      toast({
        description: "画板更新失败!"
      });
    }
  };
  return (
    <div style={{ height: "100%" }}>
      {fileData && (
        <Excalidraw
          langCode="zh-CN"
          theme="light"
          initialData={{
            elements: fileData?.whiteboard && JSON.parse(fileData?.whiteboard)
          }}
          onChange={(excalidrawElements, appState, files) => setWhiteBoardData(excalidrawElements)}
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
              toggleTheme: false
            }
          }}
        >
          <MainMenu>
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.ChangeCanvasBackground />
          </MainMenu>
          <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.ToolbarHint />
            <WelcomeScreen.Center>
              <WelcomeScreen.Center.MenuItemHelp />
            </WelcomeScreen.Center>
          </WelcomeScreen>
        </Excalidraw>
      )}
    </div>
  );
}

export default Canvas;
