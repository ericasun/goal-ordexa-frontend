// 物流公司界面
'use client';
import React, { useState, useEffect } from 'react';
import { Button, message } from "antd";
import { useLayout } from "@/context/LayoutContext";
import AddShippingCompanies from "@/app/pages/shipping/shippingCompanies/addShippingcompanies/addShippingCompaniesPage";
import PagesProps from "@/types/pagesProps";
import ShippingCompaniesTable from "@/app/pages/shipping/shippingCompanies/shippingcompaniesTable/shippingCompaniesTable"
import {ShippingCompaniesTableRow} from "@/app/pages/shipping/shippingCompanies/shippingCompaniesType";

const ShippingCompaniesPage = () => {
  const { pages, setPages, onChange } = useLayout();
  const [ loading, setLoading ] = useState<Boolean>(false);
  const [ data, setData ] = useState<ShippingCompaniesTableRow[]>([]);
  const [messageApi, contextHolder] = message.useMessage(); // 只能在组件里调用 Hook

  // 打开“新建物流公司”标签页
  const addShippingCompaniesPage = () => {
    const newPage = {
      label:"新建物流公司", 
      children: <AddShippingCompanies />, 
      key: "addShippingCompanies"
    };
    if (!pages.find((p: PagesProps) => p.key === newPage.key) ) {
      setPages([...pages, newPage]); 
    }
    onChange(newPage.key);
  }

  // 自动请求数据
  useEffect(() => {
    fetchShippingList();
  }, []);

  async function fetchShippingList() {
    setLoading(true);
    const res = await fetch("http://localhost:3001/api/shippingCompanies/fetch");
    const result = await res.json();

    if (result.success) {
      setData(result.data); 
    }

    setLoading(false);
  }

  return (
    <div>
      {contextHolder}
      <div>
        
      </div>
      <div>
        <Button>搜索</Button>
        <Button>重置</Button>
      </div>
      <div>
        <Button type="primary" onClick={()=> addShippingCompaniesPage()} >新建</Button>
        <Button>修改</Button>
        <Button disabled>废弃</Button>
        <Button>导入</Button>
        <Button>导出</Button>
        
        <ShippingCompaniesTable data={data} />
      </div>
    </div>
  );
}

export default ShippingCompaniesPage;




