"use client";
import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
// @ts-ignore
import Header from "@editorjs/header";
import List from "@editorjs/list";
// @ts-ignore
import Checklist from "@editorjs/checklist";
// @ts-ignore
import Paragraph from "@editorjs/paragraph";
// @ts-ignore
import Warning from "@editorjs/warning";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { fileListProps } from "../../dashboard/_components/FileList";
import { toast } from "@/hooks/use-toast";

function Editor({
  onSaveTrigger,
  fileId,
  fileData
}: {
  onSaveTrigger: any;
  fileId: any;
  fileData: fileListProps;
}) {
  const ref = useRef<EditorJS>();
  const updateDocument = useMutation(api.files.updateDocument);
  useEffect(() => {
    fileData && initEditor();
  }, [fileData]);
  useEffect(() => {
    console.log("triiger Value:", onSaveTrigger);
    onSaveTrigger && onSaveDocument();
  }, [onSaveTrigger]);
  const onSaveDocument = () => {
    if (ref.current) {
      ref.current
        .save()
        .then((outputData) => {
          console.log("Article data: ", outputData);
          updateDocument({
            _id: fileId,
            document: JSON.stringify(outputData)
          }).then(
            (resp) => {
              toast({
                description: "文档更新成功!"
              });
            },
            (e) => {
              toast({
                description: "文档更新失败!"
              });
            }
          );
        })
        .catch((error) => {
          console.log("Saving failed: ", error);
        });
    }
  };

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      tools: {
        headers: {
          class: Header as any,
          shortcut: "CMD+SHIFT+H",
          config: {
            placeholder: "Enter a Header"
          }
        },
        list: {
          class: List as any,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered"
          }
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true
        },
        paragraph: Paragraph,
        warning: Warning
      },
      data: fileData?.document ? JSON.parse(fileData.document) : {}
    });
    ref.current = editor;
  };
  return (
    <div>
      <div id="editorjs" className="ml-20"></div>
    </div>
  );
}

export default Editor;
