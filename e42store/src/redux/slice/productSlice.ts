import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {Product, ProductState} from "../../product.type"

const initialState: ProductState = {
    products: [],
    minPrice: 0,
    maxPrice: 0,
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        STORE_PRODUCTS: (state, action: PayloadAction<{ products: Product[] }>) => {
            state.products = action.payload.products
        },
        GET_PRICE_RANGE: (state, action: PayloadAction<{ products: Product[] }>) => {
            const prices = action.payload.products.map((product) => product.price)
            state.minPrice = Math.min(...prices)
            state.maxPrice = Math.max(...prices)
        },
    },
})

export const {STORE_PRODUCTS, GET_PRICE_RANGE} = productSlice.actions

export const selectProducts = (state: { product: ProductState }) => state.product.products
export const selectMinPrice = (state: { product: ProductState }) => state.product.minPrice
export const selectMaxPrice = (state: { product: ProductState }) => state.product.maxPrice

export default productSlice.reducer