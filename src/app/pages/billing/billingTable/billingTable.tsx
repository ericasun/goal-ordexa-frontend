// 产品界面的表格
import React from 'react';
import { Table, TableProps } from 'antd';
import productsTableCloumn from "./billingTableColumns"

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

// 定义组件 props 类型
interface ProductsListProps {
  data: [];   
  selectedRowKeys: React.Key[] | undefined
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[] | undefined>>
  loading?: boolean; // loading 是可选的
}

const BillingList: React.FC<ProductsListProps> = ({
  data, loading, selectedRowKeys, setSelectedRowKeys
}) => {
  // 选择框发生变化
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // 选择结果
  const rowSelection: TableRowSelection<> = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record) => ({
      // 只在第一行显示 checkbox
      // disabled: record.rowSpan === 0
    })
  };

  // 翻页
  const handlePageChange = () => {
    setSelectedRowKeys([]); 
  }

  return (
    <div>
      <Table
        rowSelection={ rowSelection }
        columns={ productsTableCloumn }
        dataSource={ data }
        loading={ false }
        rowKey="key"
        pagination={{
          onChange: handlePageChange,
        }}
      />
    </div>
  );
};

export default BillingList;
