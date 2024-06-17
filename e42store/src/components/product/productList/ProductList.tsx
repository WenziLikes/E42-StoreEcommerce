import React, {FC, useEffect, useState} from "react"
import styles from "./ProductList.module.scss"
import {BsFillGridFill} from "react-icons/bs"
import {FaListAlt} from "react-icons/fa"
import {useDispatch, useSelector} from "react-redux"
import {CardGrid, Pagination, ProductItem, Search, Spinner} from "../../index"
import {useFetchCollection} from "../../../customHooks"
import {Product} from "../../../product.type"
import {FILTER_BY_SEARCH, selectFilteredProducts, SORT_PRODUCTS} from "../../../redux/slice/filterSlice"

interface ProductListProps {
    products: Product[]
}

const ProductList: FC<ProductListProps> = ({products}) => {

    const {isLoading} = useFetchCollection("products")
    const [grid, setGrid] = useState<boolean>(true)
    const [search, setSearch] = useState<string>("")
    const [sort, setSort] = useState<string>("latest")
    const filteredProducts = useSelector(selectFilteredProducts)

    // Pagination states
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [productsPerPage] = useState<number>(8)
    // Get Current Products
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(SORT_PRODUCTS({products, sort}))
    }, [dispatch, products, sort])

    useEffect(() => {
        dispatch(FILTER_BY_SEARCH({products, search}))
    }, [dispatch, products, search])

    return (
        <div className={styles["product-list"]}>
            <div className={styles.top}>
                <div className={styles.icons}>
                    {/** Icons Grid And Line */}
                    <BsFillGridFill className={grid ? `${styles.icon} ${styles.active}` : `${styles.icon}`} size={22}
                                    onClick={() => setGrid(true)}/>
                    <FaListAlt className={grid ? `${styles.icon}` : `${styles.icon}  ${styles.active}`} size={24}
                               onClick={() => setGrid(false)}/>

                    <p>
                        Sorting <b>{indexOfFirstProduct + 1}-{indexOfLastProduct} of {filteredProducts.length}</b> results
                    </p>
                </div>
                {/* Sort Products */}
                <div className={styles.sort}>
                    <label>Sort by</label>
                    <select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="latest">Latest</option>
                        <option value="lowest-price">Lowest Price</option>
                        <option value="highest-price">Highest Price</option>
                        <option value="a-z">A - Z</option>
                        <option value="z-a">Z - A</option>
                    </select>
                </div>
                {/* Search */}
                <Search value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <div className={styles.bottom}>
                {products.length === 0 ? (
                    <p className={styles.product}>No product found.</p>
                ) : (
                    <>
                        {isLoading ? (
                            <Spinner/>
                        ) : (
                            <CardGrid isGridMode={grid}>
                                {currentProducts.map((product) => (
                                    <ProductItem key={product.id} {...product} grid={grid} product={product}/>
                                ))}
                            </CardGrid>
                        )}
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