import type { TableColumnsType } from 'antd';
import {ShippingCompaniesTableRow} from "@/app/pages/shipping/shippingCompanies/shippingCompaniesType";

const shippingCompaniesColumns: TableColumnsType<ShippingCompaniesTableRow> = [
  {
    title: '公司中文名称',
    dataIndex: 'cnCompanyName',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: '负责人',
    dataIndex: 'contactName',
  },
  {
    title: '联系号码',
    dataIndex: 'contactPhone',
  },
  {
    title: '仓库地点',
    dataIndex: 'warehouseAddress',
  },

  {
    title: '发货国家',
    key: 'country',
  },
  {
    title: '是否能发亚马逊仓库',
    key: 'enCompanyName',
  },
  {
    title: '是否有海外仓',
    key: 'enCompanyName',
  },
  {
    title: '公司英文名称',
    dataIndex: 'enShippingCompanyName',
  },
  {
    title: '公司代号',
    dataIndex: 'code',
  }
];

export default shippingCompaniesColumns;