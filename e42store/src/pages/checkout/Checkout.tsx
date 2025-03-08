import {loadStripe, StripeElementsOptions} from "@stripe/stripe-js"
import {FC, useEffect, useState} from "react"
import {toast} from "react-toastify"
import {Elements} from "@stripe/react-stripe-js"
import {CheckoutForm} from "../../components"
import {useAppDispatch, useAppSelector} from "../../redux/hooks"
import {
    CALCULATE_SUBTOTAL,
    CALCULATE_TOTAL_QUANTITY,
    selectCartItems,
    selectCartTotalAmount
} from "../../redux/slice/cartSlice"
import {selectEmail} from "../../redux/slice/authSlice"
import {selectBillingAddress, selectShippingAddress} from "../../redux/slice/checkoutSlice"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK!)

const Checkout: FC = () => {
    const [message, setMessage] = useState<string>("Initializing checkout...")
    const [clientSecret, setClientSecret] = useState<string>("")

    const cartItems = useAppSelector(selectCartItems)
    const totalAmount = useAppSelector(selectCartTotalAmount)
    const customerEmail = useAppSelector(selectEmail)

    const shippingAddress = useAppSelector(selectShippingAddress)
    const billingAddress = useAppSelector(selectBillingAddress)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(CALCULATE_SUBTOTAL())
        dispatch(CALCULATE_TOTAL_QUANTITY())
    }, [dispatch, cartItems])

    const description = `E42 Shop payment: email: ${customerEmail}, Amount: ${totalAmount}`

    useEffect(() => {
        fetch("http://localhost:4242/create-payment-intent", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                items: cartItems,
                userEmail: customerEmail,
                shipping: shippingAddress,
                billing: billingAddress,
                description,
            }),
        })
            .then(async (res) => {
                if (res.ok) {
                    return res.json()
                }
                const json = await res.json()
                return await Promise.reject(json)
            })
            .then((data) => {
                setClientSecret(data.clientSecret)
            })
            .catch(() => {
                setMessage("Failed to initialize checkout")
                toast.error("Something went wrong!!!")
            })
    }, [cartItems, customerEmail, shippingAddress, billingAddress, description])

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: "stripe",
        }
    }

    return (
        <>
            <section>
                <div className="container">{!clientSecret && <h3>{message}</h3>}</div>
            </section>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm/>
                </Elements>
            )}
        </>
    )
}

export default Checkout
