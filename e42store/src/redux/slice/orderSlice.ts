import {createSlice} from "@reduxjs/toolkit"
import {OrderHistoryState} from "../../product.type"

const initialState: OrderHistoryState = {
    orderHistory: [],
    totalOrderAmount: null,
};


const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        STORE_ORDERS: (state, action) => {
            state.orderHistory = action.payload
        },
        CALC_TOTAL_ORDER_AMOUNT: (state) => {
            const array = state.orderHistory.map((item) => item.orderAmount)
            state.totalOrderAmount = array.reduce((a, b) => a + b, 0)
        },
    },
})

export const {STORE_ORDERS, CALC_TOTAL_ORDER_AMOUNT} = orderSlice.actions

export const selectOrderHistory = (state: { orders: OrderHistoryState }) => state.orders.orderHistory
export const selectTotalOrderAmount = (state: { orders: OrderHistoryState }) => state.orders.totalOrderAmount

export default orderSlice.reducer