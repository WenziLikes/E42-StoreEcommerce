import {NavLink, NavLinkProps, useLocation} from "react-router-dom"
import React, {FC} from "react"
import styles from "./Link.module.scss"

interface CustomNavLinkProps extends NavLinkProps {
    className?: string
    style?: React.CSSProperties
    onClick?: () => void
}

const CustomNavLink: FC<CustomNavLinkProps> = ({
                                                   to,
                                                   className = "",
                                                   style,
                                                   onClick,
                                                   children,
                                                   ...rest
                                               }) => {
    const {pathname} = useLocation()
    const isActive: boolean = pathname === to

    return (
        <NavLink
            to={to}
            className={`${styles.link} ${isActive ? styles.active : ""} ${className}`}
            style={style}
            onClick={onClick}
            {...rest}
        >
            {children}
        </NavLink>
    )
}

export {CustomNavLink}