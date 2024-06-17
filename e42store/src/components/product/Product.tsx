import React, {useEffect} from "react"
import styles from "./Product.module.scss"
import {ProductFilter, ProductList} from "./index"
import {useFetchCollection} from "../../customHooks"
import {useAppDispatch, useAppSelector} from "../../redux/hooks"
import {GET_PRICE_RANGE, selectProducts, STORE_PRODUCTS} from "../../redux/slice/productSlice"

const Product = () => {

    const {data} = useFetchCollection("products")
    const dispatch = useAppDispatch()
    const products = useAppSelector(selectProducts)

    useEffect(() => {
        dispatch(
            STORE_PRODUCTS({
                products: data
            })
        )
        dispatch(GET_PRICE_RANGE({
            products: data,
        }))

    }, [dispatch, data])

    return (
        <div className={`container ${styles.products}`} id="products">
            <div className={styles.productFilter}>
                <ProductFilter/>
            </div>
            <div className={styles.productList}>
                <ProductList products={products}/>
            </div>
        </div>
    )
}

export default Product