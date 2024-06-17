import React, {FormEvent, useState} from "react"
import styles from "./CheckoutDetails.module.scss"
import {Accordion, Button, Card, CheckoutSummary} from "../../components"
import AddressForm from "./addressForm/AddressForm"
import {useNavigate} from "react-router-dom"
import {ShippingAddressState} from "../../product.type"
import {useAppDispatch} from "../../redux/hooks"
import {SAVE_BILLING_ADDRESS, SAVE_SHIPPING_ADDRESS} from "../../redux/slice/checkoutSlice"

const initialAddressState: ShippingAddressState = {
    name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    phone: "",
}

const CheckoutDetails: React.FC = () => {
    const [shippingAddress, setShippingAddress] = useState({...initialAddressState})
    const [billingAddress, setBillingAddress] = useState({...initialAddressState})
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleAddress = (e: {
        target: { name: string ,value: string }
    }, setAddress: React.Dispatch<React.SetStateAction<ShippingAddressState>>) => {
        const {name, value} = e.target
        setAddress(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress))
        dispatch(SAVE_BILLING_ADDRESS(billingAddress))
        navigate("/checkout")
    }

    return (
        <section>
            <div className={`container ${styles.checkout}`}>
                <h2>Checkout Details </h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.accordion}>
                        {/* Shipping Address*/}
                        <Accordion title="Shipping Address">
                            <AddressForm address={shippingAddress} setAddress={setShippingAddress}
                                         handleChange={handleAddress}/>
                        </Accordion>
                        {/* Billing Address*/}
                        <Accordion title="Billing Address">
                            <AddressForm address={billingAddress} setAddress={setBillingAddress}
                                         handleChange={handleAddress}/>
                            <Button type="submit">Proceed To Checkout</Button>
                        </Accordion>
                    </div>
                    <Card className={styles.card} column>
                        <CheckoutSummary/>
                    </Card>
                </form>
            </div>
        </section>
    )
}

export default CheckoutDetails