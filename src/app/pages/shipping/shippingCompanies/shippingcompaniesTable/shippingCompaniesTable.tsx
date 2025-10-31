// 物流表格
import React, { useState } from 'react';
import { Table, TableProps } from 'antd';
import shippingCompaniesColumns from "./shippingCompaniesColumns";
import {ShippingCompaniesTableRow} from "@/app/pages/shipping/shippingCompanies/shippingCompaniesType";


// 定义组件 props 类型
interface ProductsListProps {
  data: ShippingCompaniesTableRow[];
  loading?: boolean; // loading 是可选的
}

// rowSelection object indicates the need for row selection
const rowSelection: TableProps<ShippingCompaniesTableRow>['rowSelection'] = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: ShippingCompaniesTableRow[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: ShippingCompaniesTableRow) => ({
    disabled: record.cnShippingCompanyName === 'Disabled User', // Column configuration not to be checked
    name: record.cnShippingCompanyName,
  }),
};

const ProductsList: React.FC<ProductsListProps> = ({data, loading}) => {
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');

  console.log("====shippingcompaniessList======",data)

  return (
    <div>
      <Table<ShippingCompaniesTableRow>
        rowSelection={{ type: selectionType, ...rowSelection }}
        columns={ shippingCompaniesColumns }
        dataSource={ data }
        loading={ loading }
        rowKey="key"
      />
    </div>
  );
};

export default ProductsList;

