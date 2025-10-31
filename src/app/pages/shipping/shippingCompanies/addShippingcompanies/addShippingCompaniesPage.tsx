// 新建物流公司界面
import { Button, Form, Input, Card, message } from "antd";

const addShippingCompaniesPage = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  async function onFinish (values: any) {
    try {
      const res = await fetch("http://localhost:3001/api/shippingCompanies/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
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
      {contextHolder}
      <Card title="基础信息">
        <div style={{display:"flex"}}>
          <div>
            <Form.Item label="公司中文名称" name="cnCompanyName" 
              rules={[{ required: true, message: '不能为空' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="公司英文名称" name="enCompanyName">
              <Input />
            </Form.Item>
            <Form.Item label="公司代号" name="code">
              <Input />
            </Form.Item>
            <Form.Item label="负责人" name="contactName" 
              rules={[{ required: true, message: '不能为空' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="电话号码" name="contactPhone"
              rules={[{ required: true, message: '不能为空' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="仓库地址" name="warehouseAddress">
              <Input />
            </Form.Item>
            <Form.Item label="发货国家" name="country">
              <Input />
            </Form.Item>
            <Form.Item label="是否能发亚马逊仓库" name="canShipToAmazon">
              <Input />
            </Form.Item>
            <Form.Item label="是否有海外仓" name="hasOverseasWarehouse">
              <Input />
            </Form.Item>
            <Form.Item label="备注" name="remark">
              <Input />
            </Form.Item>
          </div>
        </div>
      </Card>

      <Form.Item>
        <Button type="primary" htmlType="submit">提交</Button>
      </Form.Item>
    </Form>
  )
}

export default addShippingCompaniesPage;
