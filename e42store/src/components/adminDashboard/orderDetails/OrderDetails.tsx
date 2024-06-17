import React, {useEffect, useState} from "react"
import {CustomLink, Spinner} from "../../index"
import styles from "../../../pages/cart/Cart.module.scss"
import style from "../../../pages/order/orderDetails/OrderDetails.module.scss"
import {RxDoubleArrowLeft} from "react-icons/rx"
import {useFetchDocument, useIdParam} from "../../../customHooks"
import {ChangeOrderStatus} from "../index"
import {CartItem, OrderState} from "../../../product.type"

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
        return <Spinner/>
    }

    if (error || !order) {
        return <p className={styles.emptyCart}>No order found</p>
    }
    return (
        <>
            <div className={`${styles["cart-table"]}`}>
                <h2>Order Details</h2>
                <div className={style["back-to"]}>
                    <CustomLink to="/order-history">Back to Orders</CustomLink>
                    <RxDoubleArrowLeft size={22} className={style.icon}/>
                </div>
                <br/>
                <div className={styles.table}>
                    <p><b>Order ID:</b> {order.id}</p>
                    <p><b>Order Amount:</b> {order.orderAmount}</p>
                    <p><b>Order Status:</b> {order.orderStatus}</p>
                    <p>
                        <b>Shipping Address:</b>
                        <br/>
                        Address: {order.shippingAddress.line1},
                        {order.shippingAddress.line2 ? order.shippingAddress.line2 : null}
                        {` ${order.shippingAddress.city}`}
                        <br/>
                        State: {order.shippingAddress.state}
                        <br/>
                        Country: {order.shippingAddress.country}
                    </p>
                    <table>
                        <thead>
                        <tr>
                            <th>s/n</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {order.cartItems.map((cart: CartItem, index: number) => {
                            const {id, name, price, imageURL, cartQuantity} = cart
                            return (
                                <tr key={id}>
                                    <td>
                                        <b>{index + 1}</b>
                                    </td>
                                    <td>
                                        <p>
                                            <b>{name}</b>
                                        </p>
                                        <img
                                            src={imageURL}
                                            alt={name}
                                            style={{width: "100px"}}
                                        />
                                    </td>
                                    <td>{price}</td>
                                    <td>{cartQuantity}</td>
                                    <td>{(price * cartQuantity).toFixed(2)}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                <ChangeOrderStatus order={order} id={id}/>
            </div>
        </>
    )
}

export default OrderDetails