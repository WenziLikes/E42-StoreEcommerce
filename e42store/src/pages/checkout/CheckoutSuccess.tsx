import React from "react"
import styles from "./CheckoutSuccess.module.scss"
import {CustomLink} from "../../components"

const CheckoutSuccess = () => {
    return (
        <section className={styles["checkout-success"]}>
            <div className="container">
                <h2>Checkout Successful</h2>
                <p>Thank you for your purchase</p>
                <br/>
                <CustomLink to="/order-history" className={styles["link-btn"]}>
                    <span className={styles.blink}>➚</span>
                    Back to View Order Status
                </CustomLink>
            </div>
        </section>
    )
}

export default CheckoutSuccess