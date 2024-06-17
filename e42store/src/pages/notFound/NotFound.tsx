import React from "react"
import styles from "./NotFound.module.scss"
import {CustomLink} from "../../components"

const NotFound = () => {
    return (
        <div className={styles["not-found"]}>
            <div>
                <h2>404</h2>
                <p>Opppppsss, page not found.</p>
                <CustomLink className={"link-btn"} to="/">&larr; Back To Home</CustomLink>
            </div>
        </div>
    )
}

export default NotFound