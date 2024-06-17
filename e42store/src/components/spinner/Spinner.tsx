import React from "react"
import styles from "./Spinner.module.scss"

const Spinner = () => {
    return (
        <div className={styles["spinner-center"]}>
            <div className={styles["lds-ripple"]}>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Spinner