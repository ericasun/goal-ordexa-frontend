// 主页
'use client';

import MainLayout from "@/app/pages/mainLayout";
import SideBar from "@/component/sideBar/sideBar";
import { LayoutProvider } from "@/context/LayoutContext";

import styles from "./page.module.scss"

export default function App() {
  return (
    <LayoutProvider>
      <div className={styles.main}>
        {/* 左侧导航栏 */}
        <div className={styles.sideBar} >
          <SideBar />
        </div>

        {/* 右侧内容 */}
        <MainLayout />
      </div>
    </LayoutProvider>
  );
}
