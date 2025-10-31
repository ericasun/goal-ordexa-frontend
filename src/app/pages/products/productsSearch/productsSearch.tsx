// 产品界面的搜索框
import zhCN from "antd/es/locale/zh_CN";
import { 
    Button, 
    ConfigProvider, 
    Select, 
    Input, 
    Space, 
    InputNumber, 
    Form, 
    DatePicker, 
    message
} from "antd";
import React, { useState } from "react";
import { fetchUrlPOST } from "@/types/fetchUrl"
import { ProductTableRow } from "@/app/pages/products/productType"
import { transformToTableData } from "@/app/pages/products/productTableUtils"

import styles from "./productsSearch.module.scss"

const { RangePicker } = DatePicker;

// 定义组件 props 类型
interface ProductsListProps {
  setData: React.Dispatch<React.SetStateAction<ProductTableRow[]>>;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>; // loading 是可选的
}

interface TimeAndWeightType{
    value: string; 
    label: React.ReactNode;
}

const ProductsSearch : React.FC<ProductsListProps>  = ({setData, setLoading})=> {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [whichDate, setWhichDate] = useState<string>('createdAt')
    const [whichWeight, setWhichWeight] = useState<string>('productWeight')

    // 选择时间
    const handleChange = async (selectedOption: TimeAndWeightType) => {
        setWhichDate(selectedOption.value)
    };

    // 选择重量
    const selectedOption = async (selectedOption: TimeAndWeightType) => {
        setWhichWeight(selectedOption.value)
    }

    // 发起搜索
    const handleSearch = async () =>  {
        // 获取搜索条件
        const values = form.getFieldsValue();

        const newValues = Object.fromEntries(
            Object.entries(values).map(([key, val]) => {
                if (key.startsWith('weight')) {
                    const newKey = key === 'weight' ?  whichWeight : whichWeight + key.slice(6);
                    return [newKey, val];
                }
                if (key.startsWith('date')) {
                    const newKey = key === 'date' ?  whichDate : whichDate + key.slice(6);
                    return [newKey, val];
                }
                return [key, val];
            })
            
        );
        
        const res = await fetchUrlPOST(
            `http://localhost:3001/api/products/fetch`, newValues, messageApi, false
        );

        if(res.success){
            const newData = transformToTableData(res.data)
            setData(newData);
        }
    }

    // 重置，清空所有表单字段
    const handleReset = async () => {
        form.resetFields(); 
    }

    return(
        <div>
            {contextHolder}
          <Form form={form} layout="inline">
            <div className={styles.search}>
                <div className={styles.searchCondition}>
                    <div className={styles.lineOne}>
                        <Form.Item name="productName">
                            <Input placeholder="产品名称" />
                        </Form.Item>
                        <Form.Item name="productAlias">
                            <Input placeholder="产品别名" />
                        </Form.Item>
                        <Form.Item name="sku">
                            <Input placeholder="产品sku"  />
                        </Form.Item>
                        <Form.Item name="model">
                            <Input placeholder="型号" />
                        </Form.Item>
                        <Form.Item name="packingTemplateName">
                            <Input placeholder="内箱模板名称" />
                        </Form.Item>
                        <Form.Item name="cartonTemplateName">
                            <Input placeholder="外箱模板名称" />
                        </Form.Item>
                    </div>
                    <div className={styles.lineTwo}>
                        <div>
                            <Select
                                labelInValue
                                defaultValue={{ value: 'productWeight', label: '产品重量' }}
                                style={{ width: 150 }}
                                onSelect={selectedOption}
                                options={[
                                {
                                    value: 'productWeight',
                                    label: '产品重量',
                                },
                                {
                                    value: 'packageWeight',
                                    label: '内箱重量',
                                },
                                {
                                    value: 'cartonWeight',
                                    label: '外箱重量',
                                }]}
                            />
                            <Space>
                                <Form.Item name="weightMin">
                                    <InputNumber placeholder="最小值"/>
                                </Form.Item>
                                <span>→</span>
                                <Form.Item name="weightMax">
                                    <InputNumber placeholder="最大值"/>
                                </Form.Item>
                            </Space>
                        </div>
                        <div className={styles.createdAt}>
                            <Select
                                labelInValue
                                defaultValue={{ value: 'createdAt', label: '创建时间' }}
                                style={{ width: 150 }}
                                onChange={handleChange}
                                options={[
                                {
                                    value: 'createdAt',
                                    label: '创建时间',
                                },
                                {
                                    value: 'updatedAt',
                                    label: '更新时间',
                                }]}
                            />
                            <ConfigProvider locale={zhCN}>
                                <Form.Item name="date">
                                    <RangePicker format="YYYY-MM-DD" />
                                </Form.Item>
                            </ConfigProvider>
                        </div>
                        <div className={styles.searchBtns}>
                            <Button onClick={()=>handleSearch()}>搜索</Button>
                            <Button onClick={()=>handleReset()}>重置</Button>
                        </div>
                    </div>
                </div>
                </div>
            </Form>
        </div>
    )
}

export default ProductsSearch;
