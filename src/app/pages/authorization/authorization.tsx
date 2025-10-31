// 首页内容
import {Button, Card, Form, Input, Select, InputNumber} from "antd";
import {areaOptions} from "./area";

const handle = () => {
  console.log("==2=")
}

const handleChange = (e) => {
  console.log("====选择的区域====",e)
}

const onFinish = (e) => {
  console.log("==亚马逊授权===",e)
  const clientId = 'amzn1.application-oa2-client.e5370ee623494ed3926d8c28db218b02';
  const redirectUri = encodeURIComponent('https://your-domain.com/api/amazon/callback');
  const state = 'someRandomString'; // 防伪参数（可选）
  const url = `https://sellercentral.amazon.com/apps/authorize/consent?application_id=${clientId}&state=${state}&version=beta&redirect_uri=${redirectUri}`;
  window.location.href = url;
}

const Authorization = () => {
  const [form] = Form.useForm();

  return (
    <div>
      <Button onClick={handle}>亚马逊授权</Button>
      <div>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Card title="添加店铺授权">
            <Form.Item  name="accountName" label="账号名" rules={[{ required: true, message: '不能为空' }]}>
              <Input placeholder="用于卖家区分各个账号" />
            </Form.Item>
            <Form.Item  name="area" label="区域" rules={[{ required: true, message: '不能为空' }]}>
                <Select
                  labelInValue
                  defaultValue={{ value: 'area', label: '请选择' }}
                  style={{ width: 150 }}
                  onChange={handleChange}
                  options={areaOptions}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">登录亚马逊授权</Button>
          </Form.Item>
          </Card>
        </Form>
      </div>
    </div>
  );
}

export default Authorization;
