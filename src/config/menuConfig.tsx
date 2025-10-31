// 导航栏目录
import {
  HomeOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  SettingOutlined,
  CarOutlined
} from "@ant-design/icons";

import type { MenuProps } from "antd";

// 静态菜单配置
const menuItems: MenuProps['items'] = [
  { key: "home", icon: <HomeOutlined />, label: "首页" },
  { key: "orders1", icon: <ShoppingCartOutlined />, label: "销售",
    children: [
      { key: "orders", label: "订单管理" },
    ]
  },
  { key: "products", icon: <AppstoreOutlined />, label: "产品管理" },
  { key: "procurement", icon: <FileTextOutlined />, label: "采购",  
    children: [
      { key: "purchaseOrder", label: "采购单" },
      { key: "billingFor1688", label: "1688订单" },
      { key: "shippingFee1", label: "物流费用" },
    ]},
  { key: "2", icon: <AppstoreOutlined />, label: " 仓库管理" },
  {
    key: "shippingManagement",
    icon: <CarOutlined />,
    label: "物流管理",
    children: [
      { key: "shippingCompanies", label: "物流公司" },
      { key: "shippingFee", label: "物流费用" },
    ],
  },
  { key: "billing", icon: <FileTextOutlined />, label: "账单" },
  {
    key: "settings",
    icon: <SettingOutlined />,
    label: "系统设置",
    children: [
      { key: "login", label: "登录日志" },
      { key: "role", label: "角色管理" },
      { key: "authorizatio1", label: "平台授权",
        children: [
          { key: "authorization", label: "店铺授权" },
        ]
       },
    ],
   }
];

export default menuItems;