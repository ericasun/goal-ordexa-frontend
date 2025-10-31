// 产品页面
'use client';

import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { useLayout } from "@/context/LayoutContext";

import { transformToTableData } from "@/app/pages/products/productTableUtils"
import Mask from "@/component/mask/mask";

import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { fetchUrlPOST } from "@/types/fetchUrl"


dayjs.locale("zh-cn"); // 设置 dayjs 语言环境

export const BillingFor1688 = () => {
  const { onChange } = useLayout();
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ data, setData ] = useState<[]>([]);
  const [ selectedRowKeys, setSelectedRowKeys ] = useState<React.Key[]>();
  const [ messageApi, contextHolder ] = message.useMessage();

  // 自动请求数据
  useEffect(() => {
    fetchProductList();
  }, []);

  // 获取产品数据
  const fetchProductList = async () => {
    setLoading(true);
    const res = await fetchUrlPOST(
      `http://localhost:3001/api/products/fetch`, '', messageApi, false
    );
    
    if(res.success){
      // 转换后的数据（供表格使用）
      const tableData = transformToTableData(res.data);
      setData(tableData)

      console.log("====产品表格结果====",res)
      console.log("====处理后的结果====",tableData)
    }

    setLoading(false);
  }

    // 更新产品
  const updateProduct = async () => {
    if(!selectedRowKeys?.length){
      messageApi.warning('请选择一条数据');
    } else if(selectedRowKeys?.length !== 1){
      messageApi.warning('只能选择一条数据');
    } else {
      const values = {"id": Number(String(selectedRowKeys[0]).split('-')[0])}
      setSelectedRowKeys(selectedRowKeys)

      // 查询选择的数据的参数
      const res = await fetchUrlPOST( 
        `http://localhost:3001/api/products/fetch`, values, messageApi, false
      );
      
      console.log("==提交的数据====", values)

      // 切换页签
      onChange("updateProduct", res.data[0]);
    }
  }

  return (
    <div>
      {contextHolder}
      {/* <Mask visible={loading} text="数据加载中..." />
      <ProductsSearch setData={setData} setLoading={setLoading}/>
      <div className={styles.tools}>
        <Button type="primary" onClick={()=> onChange("addProduct")} >新建</Button>
        <Button onClick={()=> updateProduct()}>修改</Button>
        <Button disabled>废弃</Button>
        <Button>导入</Button>
        <Button>导出</Button> 
      </div>
      <ProductsTable 
        data={data} 
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}/> */}
    </div>
  );
}

export default BillingFor1688;
