import React, {FC} from "react"
import styles from "./admin.module.scss"
import {AdminRoute} from "../../route"
import {NavBar} from "../../components"
import {useAppSelector} from "../../redux/hooks"
import {selectUserName} from "../../redux/slice/authSlice"

const Admin: FC = () => {

    const links = [
        {title: "Home Admin", url: "/admin/home"},
        {title: "All Product", url: "/admin/all-products"},
        {title: "Add Product", url: "/admin/add-product/ADD"},
        {title: "Orders", url: "/admin/orders"}
    ]
    const userName: string | null = useAppSelector(selectUserName)
    const userImage: string = "https://images.unsplash.com/photo-1558222218-b7b54eede3f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"

    return (
        <section className={`container ${styles.admin}`}>
            <NavBar links={links} userImage={userImage} userName={userName!}/>
            <div className={styles.controlPanel}>
                <AdminRoute/>
            </div>
        </section>
    )
}

export default Admin