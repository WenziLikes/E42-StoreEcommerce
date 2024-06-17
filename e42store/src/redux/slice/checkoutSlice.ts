import {createSlice} from "@reduxjs/toolkit"

// Define the type for your address
interface Address {
    street: string
    city: string
    state: string
    zip: string
    country: string
}

interface CheckoutState {
    shippingAddress: Address | {}
    billingAddress: Address | {}
}

const initialState: CheckoutState= {
    shippingAddress: {},
    billingAddress: {},
}

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        SAVE_SHIPPING_ADDRESS: (state, action) => {
            state.shippingAddress = action.payload
        },
        SAVE_BILLING_ADDRESS: (state, action) => {
            state.billingAddress = action.payload
        },
    },
})

export const {SAVE_BILLING_ADDRESS, SAVE_SHIPPING_ADDRESS} =
    checkoutSlice.actions

export const selectShippingAddress = (state: { checkout: CheckoutState }) => state.checkout.shippingAddress
export const selectBillingAddress = (state: { checkout: CheckoutState }) => state.checkout.billingAddress

export default checkoutSlice.reducer