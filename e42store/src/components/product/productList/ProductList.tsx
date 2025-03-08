import React, {FC, useEffect, useState} from "react"
import styles from "./ProductList.module.scss"
import {BsFillGridFill} from "react-icons/bs"
import {FaListAlt} from "react-icons/fa"
import {useDispatch, useSelector} from "react-redux"
import {CardGrid, Pagination, ProductItem, Search} from "../../index"
import {selectFilteredProducts, FILTER_BY_SEARCH, SORT_PRODUCTS} from "../../../redux/slice/filterSlice"

enum SortType {
    Latest = "latest",
    LowestPrice = "lowest-price",
    HighestPrice = "highest-price",
    Ascending = "a-z",
    Descending = "z-a"
}

const ProductList: FC = () => {
    const [grid, setGrid] = useState<boolean>(true)
    const [search, setSearch] = useState<string>("")
    const [sort, setSort] = useState<SortType>(SortType.Latest)

    const dispatch = useDispatch()
    const filteredProducts = useSelector(selectFilteredProducts) // ✅ use `filteredProducts`

    // Pagination states
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [productsPerPage] = useState<number>(8)
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

    // ✅ The check has been added whether the list of products has changed before Dispatch
    useEffect(() => {
        if (filteredProducts.length > 0) {
            dispatch(SORT_PRODUCTS({products: filteredProducts, sort}))
        }
    }, [dispatch, sort, filteredProducts.length])

    useEffect(() => {
        if (filteredProducts.length > 0) {
            dispatch(FILTER_BY_SEARCH({products: filteredProducts, search}))
        }
    }, [dispatch, search, filteredProducts.length])

    return (
        <div className={styles["product-list"]}>
            <div className={styles.top}>
                <div className={styles.icons}>
                    <BsFillGridFill
                        className={grid ? `${styles.icon} ${styles.active}` : `${styles.icon}`}
                        size={22}
                        onClick={() => setGrid(true)}
                    />
                    <FaListAlt
                        className={grid ? `${styles.icon}` : `${styles.icon}  ${styles.active}`}
                        size={24}
                        onClick={() => setGrid(false)}
                    />

                    <p>
                        Sorting <b>{indexOfFirstProduct + 1}-{indexOfLastProduct} of {filteredProducts.length}</b> results
                    </p>
                </div>
                {/* Sort Products */}
                <div className={styles.sort}>
                    <label>Sort by</label>
                    <select value={sort} onChange={(e) => setSort(e.target.value as SortType)}>
                        <option value={SortType.Latest}>Latest</option>
                        <option value={SortType.LowestPrice}>Lowest Price</option>
                        <option value={SortType.HighestPrice}>Highest Price</option>
                        <option value={SortType.Ascending}>A - Z</option>
                        <option value={SortType.Descending}>Z - A</option>
                    </select>
                </div>
                {/* Search */}
                <Search value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <div className={styles.bottom}>
                {filteredProducts.length === 0 ? (
                    <p className={styles.product}>No product found.</p>
                ) : (
                    <>
                        <CardGrid isGridMode={grid}>
                            {currentProducts.map((product) => (
                                <ProductItem key={product.id} product={product} grid={grid}/>
                            ))}
                        </CardGrid>
                    </>
                )}
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    productsPerPage={productsPerPage}
                    totalProducts={filteredProducts.length}
                />
            </div>
        </div>
    )
}

export default ProductList