// 产品界面表格的表头
import type { TableColumnsType } from 'antd';
import { ProductTableRow }  from '../productType';
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
  // 以下都是不同的字段，每行都显示，不需要 rowSpan
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
    title: '产品尺寸',
    dataIndex: 'productSize',
    key: 'productSize',
    render: (_, record) => ( 
      record.productLength && record.productWeight && record.productHeight 
      ? `${record.productLength} * ${record.productWidth} * ${record.productHeight} (cm)` : '' ) ,
    onCell: (record) => ({ rowSpan: record.rowSpan })
  },
  {
    title: '产品重量',
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
