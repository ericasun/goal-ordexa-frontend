// 更新产品界面
import { Button, Form, Input, InputNumber, Upload, Card, message, Space } from "antd";
import { useState } from "react"
import { fetchUrlPOST } from "@/types/fetchUrl"
import { ProductResponse} from "@/app/pages/products/productType"
import { MinusCircleOutlined, LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import Mask from "@/component/mask/mask";

import type { GetProp, UploadProps } from 'antd';

import styles from "./updateProductPage.module.scss"

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type UpdateProductProps = {
  data: ProductResponse;
};

const UpdateProductPage: React.FC<UpdateProductProps> = ({data}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [messageApi, contextHolder] = message.useMessage(); // 只能在组件里调用 Hook

  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: FileType) => {

    
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      messageApi.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      messageApi.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  
  // 加载产品数据
  form.setFieldsValue(data);

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  // 提交表格，更新产品信息
  async function onFinish (values: any) {
    console.log("====更新的产品数据=", values)
    setLoading(true);
    const res = await fetchUrlPOST(`http://localhost:3001/api/products/update`, values, messageApi);
    setLoading(false);

    console.log("===更新后返回的数据===", res)
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{  name: "", sku: "" }}
    >
      {contextHolder}
      <Mask visible={loading} text="数据加载中..." />
      <Card title="基础信息">
        <div className={styles.basicInfo}>
          <div className={styles.pic}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img draggable={false} src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </div>
          <div>
            <div className={styles.basicInfoLineOne}>
              <div>
                <Form.Item label="产品名称" name="productName"  
                  rules={[{ required: true, message: '不能为空' }]}>
                  <Input />
                </Form.Item>
              </div>
              <div>
                <Form.Item label="产品别名" name="productAlias">
                  <Input/>
                </Form.Item>
              </div>
            </div>
            <div className={styles.basicInfoLineTwo}>
              <div>
                <Form.Item label="SKU(创建后不可修改)" name="sku">
                  <Input disabled/>
                </Form.Item>
              </div>
              <div>
                <Form.Item label="型号" name="model" rules={[{ required: true, message: '不能为空' }]}>
                  <Input />
                </Form.Item>
              </div>
            </div>
            
            <Form.Item label="产品描述" name="description">
              <Input />
            </Form.Item>
          </div>
        </div>
      </Card>
      
      <Card title="产品信息">
        <div className={styles.productInfo} >
          <Form.Item label="产品尺寸">
            <div className={styles.productSize} >
              <Form.Item  name="productLength">
                <InputNumber placeholder="长" />
              </Form.Item>
              <Form.Item  name="productWidth">
                <InputNumber placeholder="宽" />
              </Form.Item>
              <Form.Item  name="productHeight">
                <InputNumber placeholder="高" />
              </Form.Item>
              <div>cm</div>
            </div>            
          </Form.Item>
          <div className={styles.productWeight}>
            <Form.Item label="产品重量" name="productWeight">
              <InputNumber />
            </Form.Item>
            <div className={styles.weightUnit}>kg</div>
          </div>
        </div>
      </Card>

      <Card title="产品包装信息">
        <div className={styles.packageInfo}>
          <Form.List name="packages">
          {(packagesFields, { add, remove }) => (
            <>
            {packagesFields.map((packagesField,index) => (
                <Space key={packagesField.key} align="baseline" >
                  <Card>
                    <div className={styles.lineOne}>
                      <div className={styles.packingTemplateName}>
                        <Form.Item 
                          {...packagesField} 
                          label="产品包装模板名称" 
                          name={[packagesField.name, 'packingTemplateName' ]} 
                        >
                          <Input />
                        </Form.Item>
                      </div>
                      <Form.Item label="产品包装尺寸" required>
                        <div className={styles.packageSize}>
                          <Form.Item  
                            {...packagesField} 
                            name={[packagesField.name, 'packageLength' ]} rules={[{ required: true, message: '不能为空' }]}>
                            <InputNumber placeholder="长" />
                          </Form.Item>
                          <Form.Item  
                            {...packagesField} 
                            name={[packagesField.name, 'packageWidth' ]}  rules={[{ required: true, message: '不能为空' }]}>
                            <InputNumber placeholder="宽" />
                          </Form.Item>
                          <Form.Item  
                            {...packagesField} 
                            name={[packagesField.name, 'packageHeight' ]} rules={[{ required: true, message: '不能为空' }]}>
                            <InputNumber placeholder="高" />
                          </Form.Item>
                          <div>cm</div>
                        </div>            
                      </Form.Item>
                      <div className={styles.packageWeight}>
                        <Form.Item label="产品包装重量" 
                          {...packagesField} 
                          name={[packagesField.name, 'packageWeight' ]} rules={[{ required: true, message: '不能为空' }]}>
                            <InputNumber />
                        </Form.Item>
                        <div className={styles.weightUnit}>kg</div>
                      </div>
                    </div>
                    <div className={styles.cartonInfo}>
                      <Card title="外箱信息">
                        <Form.List name={[packagesField.name, 'cartonConfigs']}>
                        {(cartonInfoFields, { add, remove }) => (
                          <>
                          {cartonInfoFields. map((cartonInfoField,index) => (
                            <div>
                              <Space key={cartonInfoField.key} align="baseline">
                                <div className={styles.packingTemplateName}>
                                  <Form.Item 
                                    {...cartonInfoField} 
                                    label="外箱模板名称" 
                                    name={[cartonInfoField.name, 'cartonTemplateName']}
                                    rules={[{ required: true, message: '不能为空' }]}
                                  >
                                    <Input />
                                  </Form.Item>
                                </div>
                                <div className={styles.unitsPerCarton}>
                                  <Form.Item 
                                    {...cartonInfoField} 
                                    label="每箱几个" 
                                    name={[cartonInfoField.name, 'unitsPerCarton']}
                                    rules={[{ required: true, message: '不能为空' }]}>
                                    <InputNumber />
                                  </Form.Item>
                                </div>
                                <div>
                                  <Form.Item label="外箱尺寸" required>
                                    <div className={styles.cartonSize} >
                                      <Form.Item  
                                        {...cartonInfoField} 
                                        name={[cartonInfoField.name, 'cartonLength']}
                                        rules={[{ required: true, message: '不能为空' }]}
                                      >
                                        <InputNumber placeholder="长" />
                                      </Form.Item>
                                      <Form.Item  
                                        {...cartonInfoField} 
                                        name={[cartonInfoField.name, 'cartonWidth']}
                                        rules={[{ required: true, message: '不能为空' }]}
                                      >
                                        <InputNumber placeholder="宽" />
                                      </Form.Item>
                                      <Form.Item  
                                        {...cartonInfoField} 
                                        name={[cartonInfoField.name, 'cartonHeight']}
                                        rules={[{ required: true, message: '不能为空' }]}
                                      >
                                        <InputNumber placeholder="高" />
                                      </Form.Item>
                                      <div>cm</div>
                                    </div>            
                                  </Form.Item>
                                </div>
                                <div className={styles.cartonWeight}>
                                  <Form.Item 
                                    {...cartonInfoField} 
                                    label="外箱重量" 
                                    name={[cartonInfoField.name, 'cartonWeight']}
                                    rules={[{ required: true, message: '不能为空' }]}>
                                      <InputNumber />
                                  </Form.Item>
                                  <div className={styles.weightUnit}>kg</div>
                                </div>
                                <MinusCircleOutlined onClick={() => remove(cartonInfoField.name)} />
                              </Space>
                            </div>
                          ))}
                          <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            新增外箱
                          </Button>
                          </>
                        )}
                        </Form.List>
                      </Card>
                    </div>
                  </Card>
                  <MinusCircleOutlined onClick={() => remove(packagesField.name)} />
                </Space>
            ))}
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              新增包装
            </Button>
            </>
          )}
          </Form.List>
        </div>
      </Card>

      <Form.Item>
        <Button type="primary" htmlType="submit"loading={loading} >提交</Button>
      </Form.Item>
    </Form>
  )
}

export default UpdateProductPage;

