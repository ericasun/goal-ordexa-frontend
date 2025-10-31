// 产品界面表格的表头
import type { TableColumnsType } from 'antd';
import sliceText from '@/app/tools/textSlice';

import dayjs from "dayjs";

const productColumns: TableColumnsType<ProductTableRow> = [
  {
    title: '图片',
    dataIndex: 'productImg',
    render: (_, record) => "占位",
    onCell: (record) => ({ rowSpan: record.rowSpan })
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
    render: (_, record) => <span>{record.sku}</span>,
    onCell: (record) => ({ rowSpan: record.rowSpan })
  },
  {
    title: '产品名称',
    dataIndex: 'productName',
    render: (_, record) => sliceText(record.productName),
    onCell: (record) => ({ rowSpan: record.rowSpan })
  },
  {
    title: '型号',
    dataIndex: 'model',
    key: 'model',
    render: (_, record) => record.model, 
    onCell: (record) => ({ rowSpan: record.rowSpan })
  },
  {
    title: '产品别名',
    dataIndex: 'productAlias',
    key: 'productAlias',
    render: (_, record) => sliceText(record.productAlias),
    onCell: (record) => ({ rowSpan: record.rowSpan })
  },
   { 
    title: '内箱模板名称',
    dataIndex: 'packingTemplateName',
    key: 'packingTemplateName',
    render: (_, record) => (
      <span>
        {record.packingTemplateName}
      </span>
    ),
    onCell: (record) => ({ rowSpan: record.cartonRowSpan })
  },
  {
    title: '内箱尺寸',
    key: 'packageSize',
    dataIndex: 'packageSize',
    render: (_, record) => {
      if(record.packageLength && record.packageWidth && record.packageHeight){
        return (
          <span>{record.packageLength} * {record.packageWidth} * {record.packageHeight} (cm)</span>
        );
      }
      return null;
    },
    onCell: (record) => ({ rowSpan: record.cartonRowSpan })
  },
  {
    title: '内箱重量',
    key: 'packageWeight',
    render: (_, record) => (
      <span>
        {record.packageWeight} (kg)
      </span>
    ),
    onCell: (record) => ({ rowSpan: record.cartonRowSpan })
  },
  { 
    title: '外箱模板名称',
    dataIndex: 'cartonTemplateName',
    key: 'cartonTemplateName',
    render: (_, record) => (
      <span>
        {record.cartonTemplateName}
      </span>
    )
  },
  {
    title: '外箱尺寸',
    key: 'cartonSize',
    dataIndex: 'cartonSize',
    render: (_, record) => {
      if(record.cartonLength && record.cartonWidth && record.cartonHeight){
        return (
          <span>{record.cartonLength} * {record.cartonWidth} * {record.cartonHeight} (cm)</span>
        );
      }
      return null;
    }
  },
  {
    title: '外箱重量',
    key: 'cartonWeight',
    render: (_, record) => ( record.cartonWeight ? ( <span> {record.cartonWeight} (kg) </span> ) : null )
  },
  {
    title: '每箱数量',
    dataIndex: 'productSize',
    key: 'productSize',
    render: (_, record) => ( 
      record.productLength && record.productWeight && record.productHeight 
      ? `${record.productLength} * ${record.productWidth} * ${record.productHeight} (cm)` : '' ) ,
    onCell: (record) => ({ rowSpan: record.rowSpan })
  },
  {
    title: '几箱',
    dataIndex: 'productWeight',
    key: 'productWeight',
    render: (_, record) => ( record.productWeight ? `${record.productWeight}(kg)` : ''),
    onCell: (record) => ({
      rowSpan: record.rowSpan
    })
  },
  {
    title: '产品总数',
    dataIndex: 'productWeight',
    key: 'productWeight',
    render: (_, record) => ( record.productWeight ? `${record.productWeight}(kg)` : ''),
    onCell: (record) => ({
      rowSpan: record.rowSpan
    })
  },
  {
    title: '物流公司',
    dataIndex: 'productWeight',
    key: 'productWeight',
    render: (_, record) => ( record.productWeight ? `${record.productWeight}(kg)` : ''),
    onCell: (record) => ({
      rowSpan: record.rowSpan
    })
  },
  {
    title: '运输方式',
    dataIndex: 'productWeight',
    key: 'productWeight',
    render: (_, record) => ( record.productWeight ? `${record.productWeight}(kg)` : ''),
    onCell: (record) => ({
      rowSpan: record.rowSpan
    })
  },
  {
    title: '国家',
    dataIndex: 'productWeight',
    key: 'productWeight',
    render: (_, record) => ( record.productWeight ? `${record.productWeight}(kg)` : ''),
    onCell: (record) => ({
      rowSpan: record.rowSpan
    })
  },
  {
    title: '地址',
    dataIndex: 'productWeight',
    key: 'productWeight',
    render: (_, record) => ( record.productWeight ? `${record.productWeight}(kg)` : ''),
    onCell: (record) => ({
      rowSpan: record.rowSpan
    })
  },
    {
    title: '计费单价',
    dataIndex: 'productWeight',
    key: 'productWeight',
    render: (_, record) => ( record.productWeight ? `${record.productWeight}(kg)` : ''),
    onCell: (record) => ({
      rowSpan: record.rowSpan
    })
  },
   {
    title: '计费尺寸',
    dataIndex: 'productWeight',
    key: 'productWeight',
    render: (_, record) => ( record.productWeight ? `${record.productWeight}(kg)` : ''),
    onCell: (record) => ({
      rowSpan: record.rowSpan
    })
  },
  {
    title: '计费重量',
    dataIndex: 'productWeight',
    key: 'productWeight',
    render: (_, record) => ( record.productWeight ? `${record.productWeight}(kg)` : ''),
    onCell: (record) => ({
      rowSpan: record.rowSpan
    })
  },
  {
    title: '物流费用',
    dataIndex: 'productWeight',
    key: 'productWeight',
    render: (_, record) => ( record.productWeight ? `${record.productWeight}(kg)` : ''),
    onCell: (record) => ({
      rowSpan: record.rowSpan
    })
  },
  {
    title: '物流费用',
    dataIndex: 'productWeight',
    key: 'productWeight',
    render: (_, record) => ( record.productWeight ? `${record.productWeight}(kg)` : ''),
    onCell: (record) => ({
      rowSpan: record.rowSpan
    })
  },
  {
    title: '物流跟踪号',
    dataIndex: 'productWeight',
    key: 'productWeight',
    render: (_, record) => ( record.productWeight ? `${record.productWeight}(kg)` : ''),
    onCell: (record) => ({
      rowSpan: record.rowSpan
    })
  },
  {
    title: '采购平台',
    dataIndex: 'productWeight',
    key: 'productWeight',
    render: (_, record) => ( record.productWeight ? `${record.productWeight}(kg)` : ''),
    onCell: (record) => ({
      rowSpan: record.rowSpan
    })
  },
  {
    title: '订单号',
    dataIndex: 'productWeight',
    key: 'productWeight',
    render: (_, record) => ( record.productWeight ? `${record.productWeight}(kg)` : ''),
    onCell: (record) => ({
      rowSpan: record.rowSpan
    })
  },
  {
    title: '店铺名',
    dataIndex: 'productWeight',
    key: 'productWeight',
    render: (_, record) => ( record.productWeight ? `${record.productWeight}(kg)` : ''),
    onCell: (record) => ({
      rowSpan: record.rowSpan
    })
  },
  {
    title: '采购费',
    dataIndex: 'productWeight',
    key: 'productWeight',
    render: (_, record) => ( record.productWeight ? `${record.productWeight}(kg)` : ''),
    onCell: (record) => ({
      rowSpan: record.rowSpan
    })
  },
  {
    title: '物流跟踪号',
    dataIndex: 'productWeight',
    key: 'productWeight',
    render: (_, record) => ( record.productWeight ? `${record.productWeight}(kg)` : ''),
    onCell: (record) => ({
      rowSpan: record.rowSpan
    })
  },
  {
    title: '发货日期',
    dataIndex: 'productWeight',
    key: 'productWeight',
    render: (_, record) => ( record.productWeight ? `${record.productWeight}(kg)` : ''),
    onCell: (record) => ({
      rowSpan: record.rowSpan
    })
  },
  {
    title: '创建时间',
    key: 'createdAt',
    render: (_, record) => `${ dayjs(record.createdAt).format('YYYY-MM-DD') }`,
    onCell: (record) => ({ rowSpan: record.rowSpan })
  },
  {
    title: '更新时间',
    key: 'updatedAt',
    render: (_, record) => `${ dayjs(record.updatedAt).format('YYYY-MM-DD') }`,
    onCell: (record) => ({ rowSpan: record.rowSpan })
  }
];

export default productColumns;


