import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {Product, ProductState, FirebaseTimestamp} from "../../product.type"

const initialState: ProductState = {
    products: [],
    minPrice: 0,
    maxPrice: 0,
}

// ✅ Функция конвертации `createdAt`
const parseCreatedAt = (createdAt: unknown): string | null => {
    if (!createdAt) return null

    if (typeof createdAt === "string") return createdAt // Уже строка
    if (createdAt instanceof Date) return createdAt.toISOString() // Преобразуем `Date` в строку
    if (typeof createdAt === "object" && "seconds" in (createdAt as FirebaseTimestamp)) {
        return new Date((createdAt as FirebaseTimestamp).seconds * 1000).toISOString() // Преобразуем `Timestamp` в строку
    }

    return null // Если формат неизвестен
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        STORE_PRODUCTS: (state, action: PayloadAction<{ products: Product[] }>) => {
            state.products = action.payload.products.map((product) => ({
                ...product,
                createdAt: parseCreatedAt(product.createdAt), // ✅ Обрабатываем `createdAt`
            }))
        },
        GET_PRICE_RANGE: (state) => {
            if (state.products.length === 0) return
            const prices = state.products
                .map((product) => product.price)
                .filter((price) => typeof price === "number" && !isNaN(price)) // Убираем некорректные цены

            if (prices.length > 0) {
                state.minPrice = Math.min(...prices)
                state.maxPrice = Math.max(...prices)
            } else {
                state.minPrice = 0
                state.maxPrice = 0
            }
        },
    },
})

export const {STORE_PRODUCTS, GET_PRICE_RANGE} = productSlice.actions
export const selectProducts = (state: { product: ProductState }) => state.product.products
export const selectMinPrice = (state: { product: ProductState }) => state.product.minPrice
export const selectMaxPrice = (state: { product: ProductState }) => state.product.maxPrice
export default productSlice.reducer