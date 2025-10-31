// 所有页面目录
import Home from "@/app/pages/home/homePage"
import Orders from "@/app/pages/orders/ordersPage"
// 产品管理
import Products from "@/app/pages/products/productsPage"
import AddProduct from "@/app/pages/products/addProduct/addProductPage"
import UpdateProduct from "@/app/pages/products/updateProduct/updateProductPage";

// 采购
import BillingFor1688 from "@/app/pages/procurement/billingFor1688";

// 物流管理
import ShippingCompanies from "@/app/pages/shipping/shippingCompanies/shippingCompaniesPage"
import AddShippingCompanies from "@/app/pages/shipping/shippingCompanies/addShippingcompanies/addShippingCompaniesPage"
import ShippingFee from "@/app/pages/shipping/shippingFee/shippingFeePage"
import AddShippingFee from "@/app/pages/shipping/shippingFee/addShippingFeePage"

// 账单
import Billing from "@/app/pages/billing/billingPage";
import Login from "@/app/pages/settings/loginPage";
import Role from "@/app/pages/settings/rolePage";

// 平台授权
import Authorization from "@/app/pages/authorization/authorization";


const getPages = (key: string, data?:any) => {
    switch(key){
        case "home":  return { label:"首页", children: <Home />, key: "home" }
        case "orders":  return { label:"订单管理", children: <Orders />,  key: "orders" }
        case "products": return { label:"产品", children: <Products />,  key: "products" }
        case "addProduct": return { label:"新建产品", children: <AddProduct />, key: "addProduct" } 
        case "updateProduct": return { 
            label:"更新产品", children: <UpdateProduct data={data}/>, key: "updateProduct" 
        } 
        case "shippingCompanies": 
            return { label:"物流公司", children: <ShippingCompanies />, key: "shippingCompanies" } 
        case "addShippingCompanies": 
            return { label:"新建物流公司", children: <AddShippingCompanies />, key: "addShippingCompanies" } 
        case "shippingFee": 
            return { label:"物流费用", children: <ShippingFee />, key: "shippingFee" } 
        case "addShippingFee": 
            return { label:"新建物流费用", children: <AddShippingFee />, key: "addShippingFee" } 
        case "billing":  return { label:"账单", children: <Billing />,  key: "billing" }
        case "login": return { label:"登录日志", children: <Login />, key: "login" }
        case "role": return { label:"角色管理", children: <Role />, key: "role" } 
        case "purchaseOrder": 
            return { label:"采购单", children: <BillingFor1688 />, key: "purchaseOrder" } 
        case "billingFor1688": 
            return { label:"1688订单", children: <BillingFor1688 />, key: "billingFor1688" } 
        case "authorization": 
            return { label:"店铺授权", children: <Authorization />, key: "authorization" } 

        default: break;
    }
}

export default getPages;