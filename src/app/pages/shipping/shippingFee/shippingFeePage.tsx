// 物流管理
'use client';
import React, { useState, useEffect } from 'react';
import { Button, message } from "antd";
import { useLayout } from "@/context/LayoutContext";
import AddShippingFee from "@/app/pages/shipping/shippingFee/addShippingFeePage";
import PagesProps from "@/types/pagesProps";
import ShippingFeeTable from "@/app/pages/shipping/shippingFee/shippingFeeTable"

const ShippingFee = () => {
  const { pages, setPages, onChange } = useLayout();
  const [ loading, setLoading ] = useState<Boolean>(false);
  const [ data, setData ] = useState<string[]>([]);
  const [ messageApi, contextHolder ] = message.useMessage();
  
  // 打开“新建物流费用”标签页
  const addShippingFee = () => {
    const newPage = {label:"新建物流费用", children: <AddShippingFee />, key: "addShippingFee"};
    if (!pages.find((p: PagesProps) => p.key === newPage.key) ) {
      setPages([...pages, newPage]); 
    }
    onChange(newPage.key);
  }

  // 自动请求数据
  useEffect(() => {
    fetchShippingFeeList();
  }, []);

  async function fetchShippingFeeList() {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/shippingFees/fetch");
      const data = await res.json();

      console.log("===result====", data)

      if (res.ok) {
        setData(data || []); 
      } else {
        console.error(data.message || "加载失败");
      }
    } catch (error) {
      console.error(error);
      messageApi.error("网络错误，请检查服务器连接");
    } finally {
      setLoading(false);
    }
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
        <Button type="primary" onClick={()=> addShippingFee()} >新建</Button>
        <Button>修改</Button>
        <Button disabled>废弃</Button>
        <Button>导入</Button>
        <Button>导出</Button>
        
        <ShippingFeeTable data={data} loading={loading} />
      </div>
    </div>
  );
}

export default ShippingFee;




