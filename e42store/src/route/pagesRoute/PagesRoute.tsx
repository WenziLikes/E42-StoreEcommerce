import React from "react"
import {Route, Routes} from "react-router-dom"
/** Pages */
import {
    Admin,
    Cart,
    Checkout,
    CheckoutDetails,
    CheckoutSuccess,
    Contact,
    Home,
    Login,
    NotFound,
    OrderDetails,
    OrderHistory,
    Register,
    Reset
} from "../../pages"
/** Components */
import {ProductDetails, ReviewProducts} from "../../components"
/** Route */
import {AdminOnlyRoute} from "../index"
import Profile from "../../components/adminDashboard/profile/Profile"
import Username from "../../components/adminDashboard/username/Username"

const PagesRoute = () => {
    return (
        <Routes>
            <Route path={"/"} element={<Home/>}/>
            <Route path={"/username"} element={<Username/>}/>
            <Route path={"/profile"} element={<Profile/>}/>
            <Route path={"/contact"} element={<Contact/>}/>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/register"} element={<Register/>}/>
            <Route path={"/reset"} element={<Reset/>}/>

            <Route path={"/admin/*"} element={
                <AdminOnlyRoute>
                    <Admin/>
                </AdminOnlyRoute>
            }/>
            <Route path={"/product-details/:id"} element={<ProductDetails/>}/>
            <Route path={"/cart"} element={<Cart/>}/>
            <Route path={"/checkout-details"} element={<CheckoutDetails/>}/>
            <Route path={"/checkout"} element={<Checkout/>}/>
            <Route path={"/checkout-success"} element={<CheckoutSuccess/>}/>
            <Route path={"/order-history"} element={<OrderHistory/>}/>
            <Route path={"/order-details/:id"} element={<OrderDetails/>}/>
            <Route path={"/review-product/:id"} element={<ReviewProducts/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}

export default PagesRoute