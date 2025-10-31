// 产品界面的表格
import React from 'react';
import { Table, TableProps } from 'antd';
import { ProductTableRow }  from '../productType';
import productsTableCloumn from "./productsTableColumns"

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

// 定义组件 props 类型
interface ProductsListProps {
  data: ProductTableRow[];   
  selectedRowKeys: React.Key[] | undefined
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[] | undefined>>
  loading?: boolean; // loading 是可选的
}

const ProductsTable: React.FC<ProductsListProps> = ({
  data, loading, selectedRowKeys, setSelectedRowKeys
}) => {
  // 选择框发生变化
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // 选择结果
  const rowSelection: TableRowSelection<ProductTableRow> = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record) => ({
      // 只在第一行显示 checkbox
      disabled: record.rowSpan === 0
    })
  };

  // 翻页
  const handlePageChange = () => {
    setSelectedRowKeys([]); 
  }

  return (
    <div>
      <Table<ProductTableRow>
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

export default ProductsTable;
