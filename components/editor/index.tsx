"use client";

import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import "@wangeditor/editor/dist/css/style.css";
import "./style.css";

export interface BaseEditorProps {
  value?: string;
  onChange?: (html: string) => void;
}

export interface IBaseEditor extends IDomEditor {}

const BaseEditor = ({ value, onChange }, ref) => {
  const [editor, setEditor] = useState<IDomEditor | null>(null);

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: ["fullScreen"],
  };

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: "请输入内容...",
  };

  useImperativeHandle(ref, () => ({
    editor,
    editorConfig,
    toolbarConfig,
  }));

  const iOnChange = (edit: IDomEditor) => {
    // console.log(edit.getHtml());
    onChange(edit.getHtml());
  };

  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <div className="w-full h-full flex flex-col app-editor">
      <Toolbar editor={editor} defaultConfig={toolbarConfig} mode="default" className="app-editor-toolbar" />
      <Editor
        defaultConfig={editorConfig}
        value={value}
        onCreated={setEditor}
        onChange={iOnChange}
        className="app-editor-container flex-1"
        mode="default"
      />
    </div>
  );
};

export default forwardRef<React.ElementRef<typeof BaseEditor>, BaseEditorProps>(BaseEditor);
