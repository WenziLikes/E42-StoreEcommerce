import React, {FC} from "react"
import styles from "./Logo.module.scss"
import {CustomNavLink} from "./../../index"

const Logo: FC = () => {
    return (
        <div className={styles.logo}>
            <CustomNavLink to={"/"}>
                E
                <span>4</span>
                <span>2</span>
                <p>Store</p>
            </CustomNavLink>
        </div>
    )
}

export default Logo