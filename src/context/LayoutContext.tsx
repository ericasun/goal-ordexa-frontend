// 右边展示的内容

'use client';

import React, { createContext, useContext, useState } from "react";
import Home from "@/app/pages/home/homePage";
import getPages from "@/config/pagesConfig";
import PagesProps from "@/types/pagesProps";
import { message } from "antd";

interface LayoutContextProps {
  pages: PagesProps[];
  setPages: React.Dispatch<React.SetStateAction<PagesProps[]>>;
  activeKey: string;
  setActiveKey: React.Dispatch<React.SetStateAction<string>>;
  onChange: (key: string, data?: any) => void;
}

// 默认值设为 null，子组件要判断
const LayoutContext = createContext<LayoutContextProps | null>(null);

export const useLayout = () => {
  const ctx = useContext(LayoutContext);
  if (!ctx) {
    throw new Error("useLayout must be used within LayoutProvider");
  }
  return ctx;
};

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [pages, setPages] = useState<PagesProps[]>([
    { label: "首页", children: <Home />, key: "home", closable: false }
  ]);
  // 当前激活页
  const [activeKey, setActiveKey] = useState("home");
  const [ messageApi, contextHolder ] = message.useMessage();

  // 切换页签，并激活为当前页签
  const onChange = (key: string, data?: any) => {
    // 获取要打开的页签key，并判断是否存在
    const newPage = getPages(key, data);
    if (!newPage){
      console.log(1)
      messageApi.error(`没有该页面`);
      return;
    }

    const exists = pages.some((p: PagesProps) => p.key === key);
    // 判断要打开的页签是否已经打开
    if (!exists) {
      setPages([...pages, newPage]);
    }
    setActiveKey(key);
  };

  return (
    <LayoutContext.Provider value={{ pages, setPages, activeKey, setActiveKey, onChange}}>
      {contextHolder}
      {children}
    </LayoutContext.Provider>
  );
};
