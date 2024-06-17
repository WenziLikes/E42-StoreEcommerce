import React from "react"
import {Route, Routes} from "react-router-dom"
import {AddProduct, HomeDashboard, OrderDetails, Orders, ViewProducts} from "../../components/adminDashboard"

const AdminRoute = () => {
    return (
        <Routes>
            <Route path="home" element={<HomeDashboard/>}/>
            <Route path="all-products" element={<ViewProducts/>}/>
            <Route path="add-product/:id" element={<AddProduct/>}/>
            <Route path="orders" element={<Orders/>}/>
            <Route path="order-details/:id" element={<OrderDetails/>}/>
        </Routes>
    )
}

export default AdminRoute