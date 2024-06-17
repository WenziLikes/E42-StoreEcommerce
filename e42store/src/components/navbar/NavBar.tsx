import React, {FC} from "react"
import styles from "./Navbar.module.scss"
import {CustomNavLink} from "../customLink/CustomNavLink"

interface NavBarProps {
    title?: string,
    links: { title: string, url: string } []
    userImage?: string,
    userName?: string,
}

const NavBar: FC<NavBarProps> = (navBarProps) => {
    const {title = "", links, userImage = "", userName = ""} = navBarProps
    return (
        <nav className={styles.navbar}>
            <div className={styles.user}>
                {userImage && <img src={userImage} alt="User"/>}
                <h4>#{userName}</h4>
                {title && <h4>{title}</h4>}
            </div>
            <div className={styles.links}>
                <ul>
                    {links.map((link, index) => (
                        <li key={index}>
                            <CustomNavLink to={link.url} className={styles.links}>{link.title}</CustomNavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar