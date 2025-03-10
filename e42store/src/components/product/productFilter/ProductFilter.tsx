import React, {FC, useEffect, useState} from "react"
import styles from "./ProductFilter.module.scss"
import {Button} from "../../index"
import {useAppDispatch, useAppSelector} from "../../../redux/hooks"
import {selectMaxPrice, selectMinPrice, selectProducts} from "../../../redux/slice/productSlice"
import {FILTER_BY_BRAND, FILTER_BY_CATEGORY, FILTER_BY_PRICE} from "../../../redux/slice/filterSlice"

const ProductFilter: FC = () => {
    const [category, setCategory] = useState<string>("All Category")
    const [brand, setBrand] = useState<string>("All Brands")
    const [price, setPrice] = useState<number>(3000)

    const products = useAppSelector(selectProducts)
    const minPrice = useAppSelector(selectMinPrice)
    const maxPrice = useAppSelector(selectMaxPrice)

    const dispatch = useAppDispatch()

    // We collect categories and brands
    const allCategories: string[] = ["All Category", ...new Set(products.map((product) => product.category))]
    const allBrands: string[] = ["All Brands", ...new Set(products.map((product) => product.brand))]

    // Brand filter
    useEffect(() => {
        if (products.length > 0) {
            dispatch(FILTER_BY_BRAND({products, brand}))
        }
    }, [dispatch, products, brand])

    // Filter for the price
    useEffect(() => {
        if (products.length > 0) {
            dispatch(FILTER_BY_PRICE({products, price}))
        }
    }, [dispatch, products, price])

    // Category filter via Useeffect (to use the actual `Category`)
    useEffect(() => {
        if (products.length > 0) {
            dispatch(FILTER_BY_CATEGORY({products, category}))
        }
    }, [dispatch, products, category])

    // Filter when choosing a category
    const filterProducts = (cat: string) => {
        setCategory(cat)
    }

    // Filters cleaning
    const clearFilters = () => {
        setCategory("All Category")
        setBrand("All Brands")
        setPrice(maxPrice)
        dispatch(FILTER_BY_BRAND({products, brand: "All Brands"}))
        dispatch(FILTER_BY_CATEGORY({products, category: "All Category"}))
        dispatch(FILTER_BY_PRICE({products, price: maxPrice}))
    }

    return (
        <aside>
            <h4>Categories</h4>
            <div className={styles.category}>
                {allCategories.map((cat, index) => (
                    <a
                        key={index}
                        className={category === cat ? styles.active : ""}
                        onClick={() => filterProducts(cat)}
                    >
                        {cat}
                    </a>
                ))}
            </div>

            <h4>Brand</h4>
            <div className={styles.brand}>
                <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                    {allBrands.map((brand, index) => (
                        <option key={index} value={brand}>
                            {brand}
                        </option>
                    ))}
                </select>
            </div>

            <h4>Price</h4>
            <div className={styles.price}>
                <p>{`$${price}`}</p>
                <input
                    className="range-style"
                    type="range"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    min={minPrice}
                    max={maxPrice}
                />
            </div>
            <br/>
            <Button onClick={clearFilters}>Clear Filter</Button>
        </aside>
    )
}

export default ProductFilter