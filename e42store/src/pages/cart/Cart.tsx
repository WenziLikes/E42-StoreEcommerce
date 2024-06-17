import React, {useEffect} from "react"
import styles from "./Cart.module.scss"
import {Button, Card, CustomLink} from "../../components"
import {FaTrashAlt} from "react-icons/fa"
import {useLocation, useNavigate} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../../redux/hooks"
import {
    ADD_TO_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, CLEAR_CART,
    DECREASE_CART, REMOVE_FROM_CART, SAVE_URL,
    selectCartItems,
    selectCartTotalAmount,
    selectCartTotalQuantity
} from "../../redux/slice/cartSlice"
import {selectIsLoggedIn} from "../../redux/slice/authSlice"
import {CartItem} from "../../product.type"

const Cart = () => {

    const cartItems = useAppSelector(selectCartItems)
    const cartTotalAmount = useAppSelector(selectCartTotalAmount)
    const cartTotalQuantity = useAppSelector(selectCartTotalQuantity)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const url = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const increaseCart = (cart: CartItem) => {
        dispatch(ADD_TO_CART(cart))
    }
    const decreaseCart = (cart: CartItem) => {
        dispatch(DECREASE_CART(cart))
    }
    const removeFromCart = (cart: CartItem) => {
        dispatch(REMOVE_FROM_CART(cart))
    }
    const clearCart = () => {
        dispatch(CLEAR_CART())
    }

    useEffect(() => {
        dispatch(CALCULATE_SUBTOTAL())
        dispatch(CALCULATE_TOTAL_QUANTITY())
        dispatch(SAVE_URL(""))
    }, [dispatch, cartItems])

    const checkout = () => {
        if (isLoggedIn) {
            navigate("/checkout-details")
        } else {
            dispatch(SAVE_URL(url.pathname))
            navigate("/login")
        }
    }
    return (
        <section>
            <div className={`container ${styles["cart-table"]}`}>
                <h2>Shopping Cart</h2>
                {cartItems.length === 0 ? (
                    <>
                        <p className={styles.emptyCart}>Your cart is currently empty.</p>
                        <br/>
                        <div>
                            <CustomLink to="/#products">
                                &larr; Continue sopping
                            </CustomLink>
                        </div>
                    </>
                ) : (
                    <>
                        <table>
                            <thead>
                            <tr>
                                <th>s/n</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cartItems.map((cart, index) => {
                                const {id, name, price, imageURL, cartQuantity} = cart
                                return (
                                    <tr key={id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <p><b>{name}</b></p>
                                            <div className="img">
                                                <img src={imageURL} alt={name}/>
                                            </div>
                                        </td>
                                        <td>{price}</td>
                                        <td>
                                            <div className={styles.count}>
                                                <Button width={"20%"} onClick={() => decreaseCart(cart)}>-</Button>
                                                <p><b>{cartQuantity}</b></p>
                                                <Button width={"20%"} onClick={() => increaseCart(cart)}>+</Button>
                                            </div>
                                        </td>
                                        <td>{(price * cartQuantity).toFixed(2)}</td>
                                        <td className={styles.icons}>
                                            <FaTrashAlt size={20} className={styles.icon}
                                                        onClick={() => removeFromCart(cart)}/>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        <div className={styles.summary}>
                            <Button width={"16%"} onClick={clearCart}>Clear Cart</Button>

                            <div className={styles.checkout}>
                                <CustomLink to={"/#products"}>
                                    &larr; Continue shopping
                                </CustomLink>
                                <br/>
                                <Card className={styles.card} width={"340px"} height={"200px"} column>
                                    <p><b>{`Cart item(s): ${cartTotalQuantity}`}</b></p>
                                    <div className={styles.text}>
                                        <h4>Subtotal:</h4>
                                        <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
                                    </div>
                                    <p>Tax an shipping calculated at checkout</p>
                                    <Button width={"100%"} onClick={checkout}>
                                        Checkout
                                    </Button>
                                </Card>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}

export default Cart