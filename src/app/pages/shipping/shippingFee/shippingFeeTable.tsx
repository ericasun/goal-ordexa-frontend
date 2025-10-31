// 物流表格
import React, { useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

interface ProductDataType {
  productName: string;
  productAlias: string;
  model: string;
}

interface CompanyDataType {
  cnCompanyName: string;
}

interface CartonDataType {
  cartonHeight: string;
  cartonLength: string;
  cartonWidth: string;
  packingTemplateName: string;
  unitsPerCarton: number;
}

interface ShippingFeesDataType {
  key: React.Key;
  packingTemplateName: string;
  unitsPerCarton: string;
  cartonLength:   number;
  cartonWidth:    number;
  cartonHeight:   number;
  cartonWeight:   number;
  channel: string;
  country: string;
  address: string;
  costPerCarton: number;

  startDate: string;
  endDate: string;

  product: ProductDataType;
  company: CompanyDataType;
  carton: CartonDataType;
}

const columns: TableColumnsType<ShippingFeesDataType> = [
  {
    title: '产品名称',
    dataIndex: 'productName',
    key: 'productName',
    render: (_, record) => (
      <span> {record.product.productName} </span>
    )
  },
  {
    title: 'SKU',
    dataIndex: 'productSku',
    key: 'productSku',
  },
  {
    title: '产品别名',
    dataIndex: 'productAlias',
    key: 'productAlias',
    render: (_, record) => (
      <span> {record.product.productAlias} </span>
    )
  },
  {
    title: '型号',
    dataIndex: 'model',
    key: 'model',
    render: (_, record) => (
      <span> {record.product.model} </span>
    )
  },
  {
    title: '产品包装模板名称',
    key: 'packageSize',
    dataIndex: 'packageSize',
    render: (_, record) => (
      <span>
        {record.packageLength} * {record.packageWidth} * {record.packageHeight} (cm)
      </span>
    )
  },
  {
    title: '产品包装尺寸',
    key: 'packageSize',
    dataIndex: 'packageSize',
    render: (_, record) => (
      <span>
        {record.packageLength} * {record.packageWidth} * {record.packageHeight} (cm)
      </span>
    )
  },
  {
    title: '产品包装重量',
    key: 'packageWeight',
    dataIndex: 'packageWeight',
    render: (_, record) => (
      <span>
        {record.carton.packageWeight} (kg)
      </span>
    )
  },
  {
    title: '外箱模板名称',
    dataIndex: 'packingTemplateName',
    key: 'packingTemplateName',
    render: (_, record) => (
      <span> {record.carton.packingTemplateName} </span>
    )
  },
  {
    title: '每箱数量',
    dataIndex: 'unitsPerCarton',
    key: 'unitsPerCarton',
    render: (_, record) => (
      <span> {record.carton.unitsPerCarton} </span>
    )
  },
  {
    title: '外箱尺寸',
    dataIndex: 'cartonSize',
    key: 'cartonSize',
    render: (_, record) => (
      <span>
        {record.carton.cartonLength} * {record.carton.cartonWidth} * {record.carton.cartonHeight} (cm)
      </span>
    )
  },
  {
    title: '外箱重量',
    dataIndex: 'unitsPerCarton',
    key: 'unitsPerCarton',
    render: (_, record) => (
      <span> {record.carton.unitsPerCarton} </span>
    )
  },
  {
    title: '物流公司',
    dataIndex: 'cnCompanyName',
    key: 'cnCompanyName',
      render: (_, record) => (
      <span> {record.company.cnCompanyName} </span>
    )
  },
  {
    title: '运输方式',
    dataIndex: 'channel',
    key: 'channel',
  },
   {
    title: '国家',
    dataIndex: 'country',
    key: 'country',
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '重量分段',
    dataIndex: 'costPerCarton',
    key: 'costPerCarton',
  },
  {
    title: '费用',
    dataIndex: 'costPerCarton',
    key: 'costPerCarton',
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
    render: (_, record) => (
      <span>
        {record.startDate} - {record.endDate} 
      </span>
    )
  }
];

// 定义组件 props 类型
interface ProductsListProps {
  data: DataType[];
  loading?: boolean; // loading 是可选的
}

// rowSelection object indicates the need for row selection
const rowSelection: TableProps<DataType>['rowSelection'] = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

const ProductsList: React.FC<ProductsListProps> = ({data, loading}) => {
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');

  console.log("====shippingFeesList======",data)

  return (
    <div>
      <Table<DataType>
        rowSelection={{ type: selectionType, ...rowSelection }}
        columns={ columns }
        dataSource={ data }
        loading={ loading }
        rowKey="key"
      />
    </div>
  );
};

export default ProductsList;

