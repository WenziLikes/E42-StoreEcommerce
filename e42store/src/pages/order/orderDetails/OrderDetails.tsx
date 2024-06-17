import React, {useEffect, useState} from "react"
import styles from "../../cart/Cart.module.scss"
import style from "./OrderDetails.module.scss"
import {CustomLink, Spinner} from "../../../components"
import {RxDoubleArrowLeft} from "react-icons/rx"
import {OrderInfo} from "../../index"
import {useFetchDocument, useIdParam} from "../../../customHooks"
import {OrderState} from "../../../product.type"

const OrderDetails = () => {
    const id = useIdParam()
    const [order, setOrder] = useState<OrderState | null>(null)
    const {document, error, loading} = useFetchDocument<OrderState>({collectionName: "orders", documentID: `${id}`})

    useEffect(() => {
        if (document) {
            setOrder(document)
        }
    }, [document])

    if (loading) {
        return (
            <div className="spinner-container">
                <Spinner/>
            </div>
        )
    }

    if (error || !order) {
        return (
            <div className="error-message">
                <p className={styles.emptyCart}>No order found</p>
            </div>
        );
    }
    return (
        <section>
            <div className={`container ${styles["cart-table"]}`}>
                <h2>Order Details</h2>
                <div className={style["back-to"]}>
                    <CustomLink to="/order-history">Back to Orders</CustomLink>
                    <RxDoubleArrowLeft size={22} className={style.icon}/>
                </div>
                <br/>
                <div className={styles.table}>
                    <OrderInfo order={order}/>
                </div>
            </div>
        </section>
    )
}

export default OrderDetails