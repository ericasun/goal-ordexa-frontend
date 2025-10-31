// 航运公司

// 物流公司表格字段
export interface ShippingCompaniesTableRow {
  key: React.Key;
  cnShippingCompanyName: string;
  sku: string;
  enShippingCompanyName: string;
  model: string;
  description: string;
  packageLength: number;
  packageWidth: number;
  packageHeight: number;
  packageWeight: number;

  productLength: number;
  productWidth: number;
  productHeight: number;
  productWeight: number;
}

