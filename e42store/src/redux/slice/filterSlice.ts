import {createSlice} from "@reduxjs/toolkit"
import {FilterState, Product} from "../../product.type"

enum SortType {
    Latest = 'latest',
    LowestPrice = 'lowest-price',
    HighestPrice = 'highest-price',
    Ascending = 'a-z',
    Descending = 'z-a'
}

enum CategoryType {
    AllCategory = 'All Category',
    // ... rest of the category types
}

enum BrandType {
    AllBrands = 'All Brands',
    // ... rest of the brand types
}

const initialState: FilterState = {
    filteredProducts: []
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        FILTER_BY_SEARCH: (state, action) => {
            const {products, search} = action.payload
            state.filteredProducts = products.filter(
                (product: { name: string; category: string }) =>
                    product.name.toLowerCase().includes(search.toLowerCase()) ||
                    product.category.toLowerCase().includes(search.toLowerCase())
            )
        },
        SORT_PRODUCTS: (state, action) => {
            const {products, sort} = action.payload
            let tempProducts: Product[] = []
            switch (sort) {
                case SortType.Latest:
                    tempProducts = products
                    break
                case SortType.LowestPrice:
                    tempProducts = products.slice().sort((a: { price: number }, b: { price: number }) => a.price - b.price)
                    break
                case SortType.HighestPrice:
                    tempProducts = products.slice().sort((a: { price: number }, b: { price: number }) => b.price - a.price)
                    break
                case SortType.Ascending:
                    tempProducts = products.slice().sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name))
                    break
                case SortType.Descending:
                    tempProducts = products.slice().sort((a: { name: any }, b: { name: string }) => b.name.localeCompare(a.name))
                    break
                default:
                    break
            }
            state.filteredProducts = tempProducts
        },
        FILTER_BY_CATEGORY: (state, action) => {
            const {products, category} = action.payload
            let tempProducts: Product[]
            if (category === CategoryType.AllCategory) {
                tempProducts = products
            } else {
                tempProducts = products.filter((product: { category: string }) => product.category === category)
            }
            state.filteredProducts = tempProducts
        },
        FILTER_BY_BRAND: (state, action) => {
            const {products, brand} = action.payload
            let tempProducts: Product[]
            if (brand === BrandType.AllBrands) {
                tempProducts = products
            } else {
                tempProducts = products.filter((product: { brand: string }) => product.brand === brand)
            }
            state.filteredProducts = tempProducts
        },
        FILTER_BY_PRICE: (state, action) => {
            const {products, price} = action.payload
            let tempProducts: Product[]
            tempProducts = products.filter((product: { price: number }) => product.price <= price)
            state.filteredProducts = tempProducts
        },
    },
})

export const {
    FILTER_BY_SEARCH,
    SORT_PRODUCTS,
    FILTER_BY_CATEGORY,
    FILTER_BY_BRAND,
    FILTER_BY_PRICE
} = filterSlice.actions

export const selectFilteredProducts = (state: { filter: FilterState }) => state.filter.filteredProducts

export default filterSlice.reducer