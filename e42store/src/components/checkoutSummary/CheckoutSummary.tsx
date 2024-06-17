import React from "react"
import styles from "./CheckoutSummary.module.scss"
import {Card, CustomLink} from "../index"
import {useAppSelector} from "../../redux/hooks"
import {selectCartItems, selectCartTotalAmount, selectCartTotalQuantity} from "../../redux/slice/cartSlice"

const CheckoutSummary = () => {

    const cartItems = useAppSelector(selectCartItems)
    const cartTotalAmount = useAppSelector(selectCartTotalAmount)
    const cartTotalQuantity = useAppSelector(selectCartTotalQuantity)

    return (
        <div className={styles["checkout-summary"]}>
            <h2>Checkout Summary</h2>
            <div>
                {cartItems.length === 0 ? (
                    <>
                        <p className={styles["no-item"]}>No item in your cart.</p>
                        <CustomLink to={"/#products"}>
                            Back to Shop
                        </CustomLink>
                    </>
                ) : (
                    <div>
                        <p><b>{`Cart Item(s): ${cartTotalQuantity}`}</b></p>
                        <div className={styles.text}>
                            <h4>Subtotal</h4>
                            <h3>{cartTotalAmount.toFixed(2)}</h3>
                        </div>
                        {cartItems.map((item) => {
                            const {id, name, price, cartQuantity} = item

                            return (
                                <Card key={id} className={styles.card} width={"500px"} column>
                                        <h4>Product: {name}</h4>
                                        <p>Quantity: {cartQuantity}</p>
                                        <p>Unit price: {price}</p>
                                        <p>Set price: {price * cartQuantity}</p>
                                </Card>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CheckoutSummary