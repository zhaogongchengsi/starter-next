"use client";

import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import "@wangeditor/editor/dist/css/style.css";
import { useState, useEffect } from "react";

const BaseEditor: React.FC = () => {
  const [editor, setEditor] = useState<IDomEditor | null>(null);

  // 编辑器内容
  const [html, setHtml] = useState("<p>hello</p>");

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {};

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: "请输入内容...",
  };

  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <div className="w-full h-full flex flex-col">
      <Toolbar editor={editor} defaultConfig={toolbarConfig} mode="default" />
      <Editor defaultConfig={editorConfig} value={html} onCreated={setEditor} className="flex-1" mode="default" />
    </div>
  );
};

export default BaseEditor;
