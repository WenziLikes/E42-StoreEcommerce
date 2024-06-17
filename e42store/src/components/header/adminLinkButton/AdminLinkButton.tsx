import React from "react"
import {AdminOnlyLink} from "../../../route/adminOnlyRoute/AdminOnlyRoute"
import {CustomNavLink} from "../../index"

const AdminLinkButton = () => {
    return (
        <AdminOnlyLink>
            <CustomNavLink to="/admin/home">
                Admin dashboard
            </CustomNavLink>
        </AdminOnlyLink>
    )
}

export default AdminLinkButton