import React from "react"
import styles from "./Username.module.scss"
import {AdminLinkButton} from "../../header"

const Username = () => {
    return (
        <div className={`container ${styles.username}`}>
         <h1>User name</h1>
        </div>
    )
}

export default Username