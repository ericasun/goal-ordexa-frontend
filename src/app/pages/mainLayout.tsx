// 界面右半部分
import React from 'react';
import { Tabs } from 'antd';
import { useLayout } from "@/context/LayoutContext";
import { PagesProps } from "@/types/pagesProps";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const MainLayout = () =>  {
  const { pages, setPages, onChange, activeKey, setActiveKey } = useLayout();
  
  const hideAdd:boolean = true;
  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    pages.forEach((item: PagesProps, i: number) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = pages.filter((item: PagesProps) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[newPanes.length - 1].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setPages(newPanes);
    // 设置当前高亮页签
    setActiveKey(newActiveKey);
  };

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => {
    if (action === 'remove') {
      remove(targetKey);
    }
  };

  return(
    <div>
      <Tabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        items={pages}
        hideAdd={hideAdd}
      />
    </div>
  )
}

export default MainLayout;
