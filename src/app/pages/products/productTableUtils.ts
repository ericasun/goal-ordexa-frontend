// 产品表格数据转换，并设置参数字段，和返回数据字段
import { ProductTableRow, ProductResponse } from "@/app/pages/products/productType"

/**
 * 产品表格数据转换，并设置参数字段，和返回数据字段
 * @param originalData 后台返回的数据
 * @returns  函数返回的数据类型 ProductTableRow[]
 */

export const transformToTableData = (originalData: ProductResponse[]): ProductTableRow[] => {
  const tableRows: ProductTableRow[] = [];

  for (const product of originalData) {
    const hasPackages = product.packages && product.packages.length > 0;
    // 产品跨行行数 = 所有包装的外箱数量累加
    const productRowSpan = hasPackages
      ? product.packages.reduce((sum, pkg) => sum + (pkg.cartonConfigs?.length || 1), 0)
      : 1; // 没有包装时至少一行

    let firstProductRow = true;

    // 如果没有包装，也要 push 一行
    if (!hasPackages) {
      tableRows.push({
        key: `${product.id}-empty`,
        id: product.id,
        sku: product.sku,
        model: product.model,
        productName: product.productName,
        productAlias: product.productAlias,
        productLength: product.productLength,
        productWidth: product.productWidth,
        productHeight: product.productHeight,
        productWeight: product.productWeight,

        packageLength: 0,
        packageWidth: 0,
        packageHeight: 0,
        packageWeight: 0,
        packingTemplateName: '',

        cartonLength: 0,
        cartonWidth: 0,
        cartonHeight: 0,
        cartonWeight: 0,
        unitsPerCarton: 0,
        cartonTemplateName: '',

        createdAt: product.createdAt,
        updatedAt: product.updatedAt,

        rowSpan: 1,
        cartonRowSpan: 1,
      });
      continue;
    }

    for (const pkg of product.packages) {
      const hasCartons = pkg.cartonConfigs && pkg.cartonConfigs.length > 0;
      const pkgRowSpan = hasCartons ? pkg.cartonConfigs.length : 1;
      let firstPkgRow = true;

      if (!hasCartons) {
        // 包装存在但没有外箱
        tableRows.push({
          key: `${product.id}-${pkg.id}-empty`,
          id: firstProductRow ? product.id : 0,
          sku: firstProductRow ? product.sku : '',
          model: firstProductRow ? product.model : '',
          productName: firstProductRow ? product.productName : '',
          productAlias: firstProductRow ? product.productAlias : '',
          productLength: firstProductRow ? product.productLength : 0,
          productWidth: firstProductRow ? product.productWidth : 0,
          productHeight: firstProductRow ? product.productHeight : 0,
          productWeight: firstProductRow ? product.productWeight : 0,

          packageLength: pkg.packageLength,
          packageWidth: pkg.packageWidth,
          packageHeight: pkg.packageHeight,
          packageWeight: pkg.packageWeight,
          packingTemplateName: pkg.packingTemplateName,

          cartonLength: 0,
          cartonWidth: 0,
          cartonHeight: 0,
          cartonWeight: 0,
          unitsPerCarton: 0,
          cartonTemplateName: '',

          createdAt: firstProductRow ? product.createdAt : '',
          updatedAt: firstProductRow ? product.updatedAt : '',

          rowSpan: firstProductRow ? productRowSpan : 0,
          cartonRowSpan: firstPkgRow ? pkgRowSpan : 0,
        });

        firstProductRow = false;
        firstPkgRow = false;
        continue;
      }

      // 正常情况：有外箱
      for (const c of pkg.cartonConfigs) {
        tableRows.push({
          key: `${product.id}-${pkg.id}-${c.id}`,
          id: firstProductRow ? product.id : 0,
          sku: firstProductRow ? product.sku : '',
          model: firstProductRow ? product.model : '',
          productName: firstProductRow ? product.productName : '',
          productAlias: firstProductRow ? product.productAlias : '',
          productLength: firstProductRow ? product.productLength : 0,
          productWidth: firstProductRow ? product.productWidth : 0,
          productHeight: firstProductRow ? product.productHeight : 0,
          productWeight: firstProductRow ? product.productWeight : 0,

          packageLength: pkg.packageLength,
          packageWidth: pkg.packageWidth,
          packageHeight: pkg.packageHeight,
          packageWeight: pkg.packageWeight,
          packingTemplateName: pkg.packingTemplateName,

          cartonLength: c.cartonLength,
          cartonWidth: c.cartonWidth,
          cartonHeight: c.cartonHeight,
          cartonWeight: c.cartonWeight,
          unitsPerCarton: c.unitsPerCarton,
          cartonTemplateName: c.cartonTemplateName,

          createdAt: firstProductRow ? product.createdAt : '',
          updatedAt: firstProductRow ? product.updatedAt : '',

          rowSpan: firstProductRow ? productRowSpan : 0,
          cartonRowSpan: firstPkgRow ? pkgRowSpan : 0,
        });

        firstProductRow = false;
        firstPkgRow = false;
      }
    }
  }

  return tableRows;
};
