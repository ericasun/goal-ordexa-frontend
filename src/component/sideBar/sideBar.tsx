import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useLayout } from "@/context/LayoutContext";
import menuItems from "@/config/menuConfig"
import getPages from "@/config/pagesConfig";
import PagesProps from "@/types/pagesProps";

import styles from "@/component/sideBar/sideBar.module.scss"

const { Sider } = Layout;

export default function Sidebar() {
  const { pages, setPages, onChange } = useLayout();

  const [collapsed, setCollapsed] = useState(false);
  const navigate = (key:string) => {
    const newPage = getPages(key);
    if (!pages.find((p: PagesProps) => p.key === key) && newPage ) {
      setPages([...pages, newPage]); 
    }
    onChange(key);
  }

  return (
    <Layout className={styles.sideBarContext}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        trigger={null} // 不用默认的按钮
      >
        {/* 顶部 Logo */}
        <div className={styles.tradeMark}>
          <img src="/images/tradeMark.jpg" />
          {collapsed ? "" : "奥德星 Ordexa"}
        </div>

        {/* 菜单 */}
        <Menu
          className={styles.menu}
          theme="light"
          mode="inline"
          onClick={({ key }) => navigate(key)}
          items={ menuItems }
        />

        {/* 手动触发收起/展开 */}
        <div 
          onClick={() => setCollapsed(!collapsed)} 
          style={{ cursor: "pointer" }}
          className={styles.indent}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </Sider>
    </Layout>
  );
}
