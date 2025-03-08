import React, {FC, JSX} from "react"
import {Link} from "react-router-dom"
import {useAppSelector} from "../../redux/hooks"
import {selectEmail} from "../../redux/slice/authSlice"

interface IAdminOnlyRoute {
    children: JSX.Element
}

const AdminOnlyRoute: FC<IAdminOnlyRoute> = ({children}) => {
    const userEmail = useAppSelector(selectEmail)

    if (userEmail === import.meta.env.VITE_ADMIN_USER) {
        return children
    }

    return (
        <section style={{height: "80vh"}}>
            <div className="container">
                <h2>Permission Denied</h2>
                <p>This page can only be viewed by an Admin user</p>
                <br/>
                <Link to="/">
                    <button>&larr Back To Home</button>
                </Link>
            </div>
        </section>
    )
}

export const AdminOnlyLink: FC<IAdminOnlyRoute> = ({children}) => {
    const userEmail = useAppSelector(selectEmail)

    if (userEmail === import.meta.env.VITE_ADMIN_USER) {
        return children
    }

    return null
}

export default AdminOnlyRoute
