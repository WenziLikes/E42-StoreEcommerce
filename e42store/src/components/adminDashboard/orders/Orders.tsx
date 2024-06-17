import React, {useEffect} from "react"
import styles from "../../../pages/cart/Cart.module.scss"
import {useNavigate} from "react-router-dom"
import {Loader} from "../../index"
import {useFetchCollection} from "../../../customHooks"
import {useAppDispatch, useAppSelector} from "../../../redux/hooks"
import {selectOrderHistory, STORE_ORDERS} from "../../../redux/slice/orderSlice"

const Orders = () => {

    const {data, isLoading} = useFetchCollection("orders")
    const orders = useAppSelector(selectOrderHistory)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(STORE_ORDERS(data))
    }, [dispatch, data])

    const handleClick = (id: string | number) => {
        navigate(`/admin/order-details/${id}`)
    }

    return (
        <section>
            <div className={`${styles["cart-table"]}`}>
                <h2>All Orders</h2>
                <p>
                    Open an order to <b>Change order status</b>
                </p>
                <br/>
                <>
                    {isLoading && <Loader/>}
                    <div className={styles.table}>
                        {orders.length === 0 ? (
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
                                {orders.map((order, index) => {
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

export default Orders