import React, {FormEvent, useEffect, useState} from "react"
import styles from "./CheckoutForm.module.scss"
import {PaymentElement, useElements, useStripe,} from "@stripe/react-stripe-js"
import {toast} from "react-toastify"
import {addDoc, collection, Timestamp} from "firebase/firestore"
import {useNavigate} from "react-router-dom"
import {Button, Card, CardGrid, CheckoutSummary, Spinner} from "../index"
import {useAppDispatch, useAppSelector} from "../../redux/hooks"
import {selectEmail, selectUserID} from "../../redux/slice/authSlice"
import {CLEAR_CART, selectCartItems, selectCartTotalAmount} from "../../redux/slice/cartSlice"
import {selectShippingAddress} from "../../redux/slice/checkoutSlice"
import {db} from "../../firebase/config"

const CheckoutForm = () => {

    const [message, setMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const stripe = useStripe()
    const elements = useElements()

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const userID = useAppSelector(selectUserID)
    const userEmail = useAppSelector(selectEmail)
    const cartItems = useAppSelector(selectCartItems)
    const cartTotalAmount = useAppSelector(selectCartTotalAmount)
    const shippingAddress = useAppSelector(selectShippingAddress)

    useEffect(() => {
        if (!stripe) {
            return
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        )

        if (!clientSecret) {
            return
        }
    }, [stripe])
    // Save order to Order History
    const saveOrder = async () => {
        const today = new Date()
        const date = today.toDateString()
        const time = today.toLocaleTimeString()
        const orderConfig = {
            userID,
            userEmail,
            orderDate: date,
            orderTime: time,
            orderAmount: cartTotalAmount,
            orderStatus: "Order Placed...",
            cartItems,
            shippingAddress,
            createdAt: Timestamp.now().toDate(),
        }
        try {
            await addDoc(collection(db, "orders"), orderConfig)
            dispatch(CLEAR_CART())
            toast.success("Order saved")
            navigate("/checkout-success")
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "An error has occurred")
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setMessage(null)

        if (!stripe || !elements) {
            return
        }

        setIsLoading(true)

        await stripe
            .confirmPayment({
                elements,
                confirmParams: {
                    // Make sure to change this to your payment completion page
                    return_url: "http://localhost:3000/checkout-success",
                },
                redirect: "if_required",
            })
            .then((result) => {
                // ok - paymentIntent // bad - error
                if (result.error) {
                    toast.error(result.error.message)
                    setMessage(result.error.message!)
                    return
                }
                if (result.paymentIntent) {
                    if (result.paymentIntent.status === "succeeded") {
                        setIsLoading(false)
                        toast.success("Payment successful")
                        saveOrder()
                    }
                }
            })
        setIsLoading(false)
    }

    return (
        <section>
            <div className={`container ${styles["checkout-form"]}`}>
                <form onSubmit={handleSubmit}>
                    <CardGrid isGridMode>
                        <Card className={styles.card} width={"100%"} column>
                            <CheckoutSummary/>
                        </Card>
                        <Card className={`${styles.card} ${styles.pay}`} width={"100%"}
                              maxHeight={"550px"} column>
                            <h3>Stripe Checkout</h3>
                            <PaymentElement id={styles["payment-element"]}/>
                            <Button
                                disabled={isLoading || !stripe || !elements}
                                id="submit"
                                className={styles.button}
                            >
                <span id="button-text">
                  {isLoading ? (
                      <Spinner/>
                  ) : (
                      "Pay now"
                  )}
                </span>
                            </Button>
                            {/* Show any error or success messages */}
                            {message && <div id={styles["payment-message"]}>{message}</div>}
                        </Card>
                    </CardGrid>
                </form>
            </div>
        </section>
    )
}

export default CheckoutForm