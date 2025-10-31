// 产品界面相关字段

// 产品字段
export interface Product {
  id:      number;
  sku:     string;
  model:   string;
  productName:    string;
  productAlias?:  string;
  description?:    string;

  productLength:  number;
  productWidth:   number;
  productHeight:  number;
  productWeight:  number;

  updatedAt:     string;
  createdAt:     string;
}

// 内箱字段
export interface ProductPackage {
  id: number;
  packageLength: number;
  packageWidth:  number;
  packageHeight: number;
  packageWeight: number;
  packingTemplateName: string;

  updatedAt:     string;
  createdAt:     string;
}

// 外箱字段
export interface CartonConfig {
  id: number;
  cartonLength:    number;
  cartonWidth:     number;
  cartonHeight:    number;
  cartonWeight:    number;
  unitsPerCarton:  number;     // 每箱多少个产品
  cartonTemplateName: string;
}

// 产品字段-后台原始数据  
export interface ProductResponse extends Product {  
  packages:      (ProductPackage & {cartonConfigs: CartonConfig[]})[];
}

// 产品表格展示用类型
export interface ProductTableRow  extends Product, ProductPackage, CartonConfig {
  key:            React.Key;

  // 表格专用字段
  rowSpan?:       number;       // 用于合并行
  cartonRowSpan?: number;
  isFirstRow?:    boolean;
}

