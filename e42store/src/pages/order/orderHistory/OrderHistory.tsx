import React, {useEffect} from "react"
import styles from "../../cart/Cart.module.scss"
import {Loader} from "../../../components"
import {useNavigate} from "react-router-dom"
import {useFetchCollection} from "../../../customHooks"
import {useAppDispatch, useAppSelector} from "../../../redux/hooks"
import {selectOrderHistory, STORE_ORDERS} from "../../../redux/slice/orderSlice"
import {selectUserID} from "../../../redux/slice/authSlice"

const OrderHistory = () => {

    const {data, isLoading} = useFetchCollection("orders")
    const orders = useAppSelector(selectOrderHistory)
    const userID = useAppSelector(selectUserID)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(STORE_ORDERS(data))
    }, [dispatch, data])

    const handleClick = (id: string | number) => {
        navigate(`/order-details/${id}`)
    }

    const filteredOrders =
        orders.filter((order) => order.userID === userID)

    return (
        <section>
            <div className={`container ${styles["cart-table"]}`}>
                <h2>Your Order History</h2>
                <p>
                    Open an order to leave a <b>Product Review</b>
                </p>
                <br/>
                <>
                    {isLoading && <Loader/>}
                    <div className={styles.table}>
                        {filteredOrders.length === 0 ? (
                            <p className={styles.emptyCart}>No order found</p>
                        ) : (
                            <table>
                                <thead>
                                <tr>
                                    <th>s/n</th>
                                    <th>Date</th>
                                    <th>Order ID</th>
                                    <th>Order Amount</th>
                                    <th>Order Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredOrders.map((order, index) => {
                                    const {
                                        id,
                                        orderDate,
                                        orderTime,
                                        orderAmount,
                                        orderStatus,
                                    } = order
                                    const statusClass =
                                        orderStatus !== "Delivered" ?
                                            (orderStatus === "Order Placed..." ? `${styles.pending}`
                                                : (orderStatus === "Processing..." ? `${styles.processing}`
                                                    : `${styles.shipped}`))
                                            : `${styles.delivered}`
                                    return (
                                        <tr key={id} onClick={() => handleClick(id)}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {orderDate} at {orderTime}
                                            </td>
                                            <td>{id}</td>
                                            <td>
                                                {"$"}
                                                {orderAmount}
                                            </td>
                                            <td>
                                                <p
                                                    className={statusClass}
                                                >
                                                    {orderStatus}
                                                </p>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </>
            </div>
        </section>
    )
}

export default OrderHistory