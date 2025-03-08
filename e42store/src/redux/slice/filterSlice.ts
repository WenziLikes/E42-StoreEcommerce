import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {FilterState, Product} from "../../product.type"

enum SortType {
    Latest = "latest",
    LowestPrice = "lowest-price",
    HighestPrice = "highest-price",
    Ascending = "a-z",
    Descending = "z-a",
}

enum CategoryType {
    AllCategory = "All Category",
    // ... остальные категории
}

enum BrandType {
    AllBrands = "All Brands",
    // ... остальные бренды
}

const initialState: FilterState = {
    filteredProducts: [],
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        FILTER_BY_SEARCH: (state, action: PayloadAction<{ products: Product[]; search: string }>) => {
            const {products, search} = action.payload
            state.filteredProducts = products.filter(
                (product) =>
                    product.name.toLowerCase().includes(search.toLowerCase()) ||
                    product.category.toLowerCase().includes(search.toLowerCase())
            )
        },
        SORT_PRODUCTS: (state, action: PayloadAction<{ products: Product[]; sort: SortType }>) => {
            const {products, sort} = action.payload

            if (sort === SortType.Latest) {
                state.filteredProducts = products
                return
            }

            state.filteredProducts = [...products].sort((a, b) => {
                switch (sort) {
                    case SortType.LowestPrice:
                        return a.price - b.price
                    case SortType.HighestPrice:
                        return b.price - a.price
                    case SortType.Ascending:
                        return a.name.localeCompare(b.name)
                    case SortType.Descending:
                        return b.name.localeCompare(a.name)
                    default:
                        return 0
                }
            })
        },
        FILTER_BY_CATEGORY: (state, action: PayloadAction<{ products: Product[]; category: string }>) => {
            const {products, category} = action.payload
            state.filteredProducts = category === CategoryType.AllCategory
                ? products
                : products.filter((product) => product.category === category)
        },
        FILTER_BY_BRAND: (state, action: PayloadAction<{ products: Product[]; brand: string }>) => {
            const {products, brand} = action.payload
            state.filteredProducts = brand === BrandType.AllBrands
                ? products
                : products.filter((product) => product.brand === brand)
        },
        FILTER_BY_PRICE: (state, action: PayloadAction<{ products: Product[]; price: number }>) => {
            const {products, price} = action.payload
            state.filteredProducts = products.filter((product) => product.price <= price)
        },
    },
})

export const {
    FILTER_BY_SEARCH,
    SORT_PRODUCTS,
    FILTER_BY_CATEGORY,
    FILTER_BY_BRAND,
    FILTER_BY_PRICE,
} = filterSlice.actions

export const selectFilteredProducts = (state: { filter: FilterState }) => state.filter.filteredProducts

export default filterSlice.reducer