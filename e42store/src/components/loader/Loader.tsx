import React from "react"
import styles from "./Loader.module.scss"
import ReactDOM from "react-dom"

const Loader = () => {
    return ReactDOM.createPortal(
        <div className={styles.wrapper}>
            <div className={styles.loading}>
                <h2 className={styles["loader-title"]}>Loading 😉</h2>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>,
        document.getElementById("loader") ?? document.body
    )
}

export default Loader