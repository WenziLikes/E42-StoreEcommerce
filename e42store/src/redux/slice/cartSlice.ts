import {createSlice} from "@reduxjs/toolkit"
import {toast} from "react-toastify"
import {CartState} from "../../product.type"

const initialState: CartState = {
    cartItems: (typeof localStorage !== "undefined" && localStorage.getItem("cartItems"))
        ? JSON.parse(localStorage.getItem("cartItems")!)
        : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    previousURL: "",
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        ADD_TO_CART: (state, action) => {
            //   console.log(action.payload)
            const productIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            )

            if (productIndex >= 0) {
                // Item already exists in the cart
                // Increase the cartQuantity
                state.cartItems[productIndex].cartQuantity += 1
                toast.info(`${action.payload.name} increased by one`, {
                    position: "top-left",
                })
            } else {
                // Item doesn't exist in the cart
                // Add item to the cart
                const tempProduct = {...action.payload, cartQuantity: 1}
                state.cartItems.push(tempProduct)
                toast.success(`${action.payload.name} added to cart`, {
                    position: "top-left",
                })
            }
            // save cart to LS
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        DECREASE_CART(state, action) {
            console.log(action.payload)
            const productIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            )

            if (state.cartItems[productIndex].cartQuantity > 1) {
                state.cartItems[productIndex].cartQuantity -= 1
                toast.info(`${action.payload.name} decreased by one`, {
                    position: "top-left",
                })
            } else if (state.cartItems[productIndex].cartQuantity === 1) {
                state.cartItems = state.cartItems.filter(
                    (item) => item.id !== action.payload.id
                )
                toast.success(`${action.payload.name} removed from cart`, {
                    position: "top-left",
                })
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        REMOVE_FROM_CART(state, action) {
            state.cartItems = state.cartItems.filter(
                (item) => item.id !== action.payload.id
            )
            toast.success(`${action.payload.name} removed from cart`, {
                position: "top-left",
            })

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        CLEAR_CART(state) {
            state.cartItems = []
            toast.info(`Cart cleared`, {
                position: "top-left",
            })

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        CALCULATE_SUBTOTAL(state) {
            const array: number[] = []
            state.cartItems.map((item) => {
                const {price, cartQuantity} = item
                const cartItemAmount = price * cartQuantity
                return array.push(cartItemAmount)
            })
            state.cartTotalAmount = array.reduce((a, b) => {
                return a + b
            }, 0)
        },
        CALCULATE_TOTAL_QUANTITY(state) {
            const array: number[] = []
            state.cartItems.map((item) => {
                const {cartQuantity} = item
                return array.push(cartQuantity)
            })
            state.cartTotalQuantity = array.reduce((a, b) => {
                return a + b
            }, 0)
        },
        SAVE_URL(state, action) {
            console.log(action.payload)
            state.previousURL = action.payload
        },
    },
})

export const {
    ADD_TO_CART,
    DECREASE_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    CALCULATE_SUBTOTAL,
    CALCULATE_TOTAL_QUANTITY,
    SAVE_URL,
} = cartSlice.actions

export const selectCartItems = (state: { cart: CartState }) => state.cart.cartItems
export const selectCartTotalQuantity = (state: { cart: CartState }) => state.cart.cartTotalQuantity
export const selectCartTotalAmount = (state: { cart: CartState }) => state.cart.cartTotalAmount
export const selectPreviousURL = (state: { cart: CartState }) => state.cart.previousURL


export default cartSlice.reducer