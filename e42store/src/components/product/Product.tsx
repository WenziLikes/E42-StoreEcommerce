import React, {useEffect} from "react"
import styles from "./Product.module.scss"
import {ProductFilter, ProductList} from "./index"
import {useFetchCollection} from "../../customHooks"
import {useAppDispatch, useAppSelector} from "../../redux/hooks"
import {GET_PRICE_RANGE, STORE_PRODUCTS} from "../../redux/slice/productSlice"
import type {Product} from "../../product.type"

// ✅ Universal function for processing Firebase Timestamp (`createdAt` и `editedAt`)
const parseTimestamp = (timestamp: unknown): string | null => {
    if (!timestamp) return null
    if (typeof timestamp === "string") return timestamp
    if (timestamp instanceof Date) return timestamp.toISOString()
    if (typeof timestamp === "object" && "seconds" in (timestamp as any)) {
        return new Date((timestamp as any).seconds * 1000).toISOString()
    }
    return null
}

const Product = () => {
    const {data} = useFetchCollection("products") // ✅ We download data from Firestore
    const dispatch = useAppDispatch()
    const products = useAppSelector((state) => state.product.products)

    useEffect(() => {
        if (data && Array.isArray(data)) {
            // ✅ We convert `Creedat` and` editeDat` into a serialized format before saving in Redux
            const parsedProducts = data.map((product: Product) => ({
                ...product,
                createdAt: parseTimestamp(product.createdAt),
                editedAt: parseTimestamp(product.editedAt), // ✅ Now we process `editeed`
            }))

            dispatch(STORE_PRODUCTS({products: parsedProducts}))
        }
    }, [dispatch, data])

    useEffect(() => {
        if (products.length > 0) {
            dispatch(GET_PRICE_RANGE())
        }
    }, [dispatch, products.length])

    return (
        <div className={`container ${styles.products}`} id="products">
            <div className={styles.productFilter}>
                <ProductFilter/>
            </div>
            <div className={styles.productList}>
                <ProductList/>
            </div>
        </div>
    )
}

export default Product