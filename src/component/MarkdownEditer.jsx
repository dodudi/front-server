import React from "react";
import MDEditor, { commands } from "@uiw/react-md-editor";

function MarkdownEditor({ value, onChange }) {
  // 로컬 이미지 업로드 명령어 정의
  const LocalImageCommand = {
    name: "image",
    keyCommand: "image",
    buttonProps: { "aria-label": "이미지 업로드" },
    icon: (
      <svg width="12" height="12" viewBox="0 0 20 20">
        <path
          fill="currentColor"
          d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"
        />
      </svg>
    ),
    execute: async (state, api) => {
      const fileInput = document.createElement("input");
      fileInput.type = "file";

      fileInput.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await fetch(
            "http://localhost:8081/files/blog/upload",
            {
              method: "POST",
              body: formData,
            }
          );

          console.log(response);
          if (!response.ok) {
            throw new Error("업로드 실패");
          }

          const data = await response.json();
          const fileUrl = data.fileUrl;

          const fileMarkdown = file.type.startsWith("image/")
            ? `![${file.name}](${fileUrl})`
            : `[${file.name}](${fileUrl})`;

          api.replaceSelection(fileMarkdown);
        } catch (error) {
          console.error("파일 업로드 실패:", error);
          alert("파일 업로드에 실패했습니다.");
        }
      };

      fileInput.click();
      return state;
    },
  };

  // 파일 업로드 명령어 정의
  const FileUploadCommand = {
    name: "file-upload",
    keyCommand: "file-upload",
    buttonProps: { "aria-label": "파일 업로드" },
    icon: (
      <svg width="12" height="12" viewBox="0 0 20 20">
        <path
          fill="currentColor"
          d="M15.3 3.3c0-.4.3-.8.7-.8.4 0 .7.3.7.8v11.3c0 .4-.3.7-.7.7-.4 0-.7-.3-.7-.7V3.3zm-5 0c0-.4.3-.8.7-.8.4 0 .7.3.7.8v11.3c0 .4-.3.7-.7.7-.4 0-.7-.3-.7-.7V3.3zm-5 0c0-.4.3-.8.7-.8.4 0 .7.3.7.8v11.3c0 .4-.3.7-.7.7-.4 0-.7-.3-.7-.7V3.3zm-2.4 15c0 .4.3.7.7.7h15.3c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7H3.6c-.4 0-.7.3-.7.7zM18.9.9H1.1C.5.9 0 1.4 0 2v11.8c0 .6.5 1.1 1.1 1.1h17.8c.6 0 1.1-.5 1.1-1.1V2c0-.6-.5-1.1-1.1-1.1z"
        />
      </svg>
    ),
    execute: async (state, api) => {
      const fileInput = document.createElement("input");
      fileInput.type = "file";

      fileInput.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file); // 서버에서 "file" 키로 받도록

        try {
          const response = await fetch(
            "http://localhost:8081/files/blog/upload",
            {
              method: "POST",
              body: formData,
            }
          );
          console.log(response);
          if (!response.ok) {
            throw new Error("업로드 실패");
          }

          const data = await response.json();
          const fileUrl = data.fileUrl;

          const fileMarkdown = file.type.startsWith("image/")
            ? `![${file.name}](${fileUrl})`
            : `[${file.name}](${fileUrl})`;

          api.replaceSelection(fileMarkdown);
        } catch (error) {
          console.error("파일 업로드 실패:", error);
          alert("파일 업로드에 실패했습니다.");
        }
      };

      fileInput.click();
      return state;
    },
  };

  const defaultCommands = commands.getCommands();
  const customCommands = defaultCommands.map((cmd) => {
    if (cmd.name === "image") {
      return LocalImageCommand;
    }
    return cmd;
  });

  customCommands.push(FileUploadCommand);

  return (
    <div data-color-mode="light">
      <MDEditor
        value={value}
        onChange={onChange}
        height={500}
        commands={customCommands}
      />
    </div>
  );
}

export default MarkdownEditor;
