// 新建物流费用界面
import { Button, Form, Input, Card, Select, message } from "antd";
import { useState, useEffect } from "react";
import debounce from "lodash.debounce";

const channelOptions = [
  {
    value: 'express',
    label: '快递',
  },
  {
    value: 'air',
    label: '空运',
  },
  {
    value: 'sea',
    label: '海派',
  },
  {
    value: 'truck',
    label: '卡派',
  }
]

type CartonOption = {
  id?: number
  label: string
  value?: number
  cartonConfigId?: number
  productSku: string
  packingTemplateName: string
  unitsPerCarton: number
  cartonLength: number
  cartonWidth: number
  cartonHeight: number
}

const addShippingPage = () => {
  const [ form ] = Form.useForm();
  const [ skuOptions, setSkuOptions ] = useState([]);
  const [ packingTemplateNameOptions, setPackingTemplateNameOptions ] = useState<CartonOption[]>([]);
  const [ cartonsData, setCartonsData ] = useState<CartonOption[]>([]);
  const [ shippingCompaniesOptions, setShippingCompaniesOptions] = useState([]);
  const [ cartonConfigId, setCartonConfigId ] = useState();
  const [ companyId, setCompanyId] = useState([]);
  const [ productSku, setProductSku] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [ loading, setLoading ] = useState(false);
  
  // 自动请求数据
  useEffect(() => {
    fetchShippingCompaniesList();
  }, []);

  // 获取 航运公司 名单 
  const fetchShippingCompaniesList = async () => {
    const res = await fetch(`http://localhost:3001/api/shippingCompanies/fetch`);
    const data = await res.json();
    
    const newOptions = data.map((item: any) => ({
      label: item.cnCompanyName,   // label 和 value 每个选项一定要的
      value: item.id,
      
      companyId: item.id,
      cnCompanyName: item.cnCompanyName,
      enCompanyName: item.enCompanyName,
    }));

    // 设置航运公司名单
    setShippingCompaniesOptions(newOptions)
  }

  const handleOnChangeByPackingTemplateName = () => {
    console.log("============")
  }
   // 防抖搜索函数 搜索sku
  const handleSearchBySku = debounce(async (value) => {
    if (!value) { return;}
    const res = await fetch(`http://localhost:3001/api/products/fetch?sku=${value}`);
    const data = await res.json();

    console.log("==搜索sku后的结果===",data)
    // 把 label/value 以及额外字段放进去
    const newOptions = data.map((item: any) => ({
      label: item.sku,
      value: item.id,

      productSku: item.sku,
      productName: item.productName,
      productAlias: item.productAlias,
      model: item.model,
    }));

    setSkuOptions(newOptions);
  }, 300);

  // 选择 SKU 后触发
  const handleSelectBySku = async (value: any) => {
    // 找到被选中的项
    const selected = skuOptions.find((opt: any) => opt.value === value);
    if (selected) {
      setProductSku(selected.productSku)
      // 自动填充表单字段
      form.setFieldsValue({
        productSku: selected.productSku,
        productName: selected.productName,
        productAlias: selected.productAlias,
        model: selected.model,
      });
    }

    // 获取 sku 对应的所有外箱信息
    const cartonsRes = await fetch(`http://localhost:3001/api/cartons/fetch?sku=${productSku}`);
    const cartonsData = await cartonsRes.json();

    const newOptions = cartonsData.map((item: any) => ({
      label: item.packingTemplateName,
      value: item.id,

      cartonConfigId: item.id,
      productSku: item.productSku,
      packingTemplateName: item.packingTemplateName,
      cartonLength: item.cartonLength,
      cartonWidth: item.cartonWidth,
      cartonHeight: item.cartonHeight,
      unitsPerCarton: item.unitsPerCarton
    }));

    setPackingTemplateNameOptions(newOptions)
    setCartonsData(cartonsData)
  };
  
  // 防抖搜索函数 搜索外箱模板名称
  const handleSearchByPackingTemplateName =  debounce(async (value) => {
    if (!value) { return;}

    console.log("====外箱信息1===", cartonsData)
    // 把 label/value 以及额外字段放进去
    const newOptions = cartonsData.map((item: CartonOption) => ({
      label: item.packingTemplateName,
      value: item.id,

      cartonConfigId: item.id,
      productSku: item.productSku,
      packingTemplateName: item.packingTemplateName,
      unitsPerCarton: item.unitsPerCarton,
      cartonLength: item.cartonLength,
      cartonWidth: item.cartonWidth,
      cartonHeight: item.cartonHeight,
    }));

    console.log("====newOptions===", newOptions)

    setPackingTemplateNameOptions(newOptions);
  }, 300);

  // 选择 外箱模板名称
  const handleSelectByPackingTemplateName = (value: any) => {
    // 找到被选中的项
    const selected = packingTemplateNameOptions.find((opt: any) => opt.value === value);
    if (selected) {
      // 自动填充表单字段
      form.setFieldsValue({
        unitsPerCarton: selected.unitsPerCarton,
        packingTemplateName: selected.packingTemplateName,
        cartonLength: selected.cartonLength,
        cartonWidth: selected.cartonWidth,
        cartonHeight: selected.cartonHeight,
      });

      setCartonConfigId(selected.value)
    }
  };

    // 防抖搜索函数 搜索物流公司
  const handleSearchByCnCompanyName =  debounce(async (value) => {
    if (!value) { return;}

    // 把 label/value 以及额外字段放进去
    const newOptions = cartonsData.map((item: any) => ({
      label: `${item.sku}`,
      value: item.id,
      sku: item.sku,
    }));

  }, 300);

  // 选择 物流公司
  const handleSelectByCnCompanyName = (value: any) => {
    // 找到被选中的项
    const selected = shippingCompaniesOptions.find((opt: any) => opt.value === value);
    console.log("====选择哪家公司===",selected)
    if (selected) {
      setCompanyId(selected.companyId)       // 设置选择的物流公司
    }
  };
  
  // 提交表单
  async function onFinish (values: any) {
    console.log("====values==",values)
    const newData = {
      productSku: productSku,
      address: values.address,
      cartonConfigId: cartonConfigId,
      channel: values.channel,
      companyId: companyId,
      costPerCarton: values.costPerCarton,
      country: values.country,
      startDate: values.startDate,
      endDate: values.endDate,
    };

    console.log("====传值==",newData)

    try {
      const res = await fetch("http://localhost:3001/api/shippingFee/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      const result = await res.json();

      if (res.ok) {
        console.log("后端返回:", result);
        messageApi.success(`保存成功！`);
        form.resetFields();
      } else {
        console.error("请求失败:", result);
        messageApi.error(`保存失败： + ${result.message}`);
      }
    } catch (error) {
      console.error("网络错误:", error);
      messageApi.error(`网络错误，无法连接服务器`);
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ name: "", sku: "" }}
    >
      <Card title="基础信息">
        <div style={{display:"flex"}}>
          <div>图片</div>
          <div>
            <Form.Item label="产品 SKU" name="sku" rules={[{ required: true}]}>
              <Select
                showSearch
                placeholder="输入 SKU 搜索产品"
                onSearch={handleSearchBySku}
                onSelect={handleSelectBySku}
                options={skuOptions}
                filterOption={false}
              />
            </Form.Item>
            <Form.Item label="产品名称" name="productName" 
              rules={[{ required: true, message: '不能为空' }]}>
              <Input  disabled />
            </Form.Item>
            <Form.Item label="产品别名" name="productAlias">
              <Input  disabled/>
            </Form.Item>
            <Form.Item label="类型" name="model">
              <Input  disabled/>
            </Form.Item>
            <Form.Item label="外箱模板名称" name="packingTemplateName" 
            rules={[{ required: true}]}
            >
              <Select
                showSearch
                placeholder="输入外箱模板名称"
                onSearch={handleSearchByPackingTemplateName}
                onSelect={handleSelectByPackingTemplateName}
                options={packingTemplateNameOptions}
                filterOption={false}
                onChange={handleOnChangeByPackingTemplateName}
              />
            </Form.Item>
            <Form.Item label="每箱几个" name="unitsPerCarton">
              <Input disabled/>
            </Form.Item>
            <Form.Item label="箱子长" name="cartonLength">
              <Input disabled/>
            </Form.Item>
            <Form.Item label="箱子宽" name="cartonWidth">
              <Input disabled/>
            </Form.Item>
            <Form.Item label="箱子高" name="cartonHeight">
              <Input disabled/>
            </Form.Item>
            <Form.Item label="物流公司" name="cnCompanyName" rules={[{ required: true}]}>
              <Select
                showSearch
                placeholder="输入物流公司"
                onSearch={handleSearchByCnCompanyName}
                onSelect={handleSelectByCnCompanyName}
                options={shippingCompaniesOptions}
                filterOption={false}
              />
            </Form.Item>
            <Form.Item label="运输方式" name="channel" rules={[{ required: true}]}>
              <Select
                showSearch
                placeholder="输入运输方式"
                onSearch={handleSearchBySku}
                onSelect={handleSelectBySku}
                options={channelOptions}
                filterOption={false}
              />
            </Form.Item>
            <Form.Item label="国家" name="country" 
              rules={[{ required: true, message: '不能为空' }]}>
              <Input />
            </Form.Item>
             <Form.Item label="地址" name="address" 
              rules={[{ required: true, message: '不能为空' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="物流费用(￥)" name="costPerCarton" 
              rules={[{ required: true, message: '不能为空' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="开始日期" name="startDate">
              <Input />
            </Form.Item>
             <Form.Item label="结束日期" name="endDate">
              <Input />
            </Form.Item>
            <Form.Item label="备注" name="remark">
              <Input />
            </Form.Item>
          </div>
        </div>
      </Card>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>提交</Button>
      </Form.Item>
    </Form>
  )
}

export default addShippingPage;