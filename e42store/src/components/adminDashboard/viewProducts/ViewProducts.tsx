import React, {FC, useEffect, useState} from "react"
import styles from "./ViewProducts.module.scss"
import {toast} from "react-toastify"
import {deleteDoc, doc} from "firebase/firestore"
import {FaEdit, FaTrashAlt} from "react-icons/fa"
import {deleteObject, ref} from "firebase/storage"
import Notiflix from "notiflix"
import {CustomLink, Pagination, Search, Spinner} from "../../index"
import {useFetchCollection} from "../../../customHooks"
import {useAppDispatch, useAppSelector} from "../../../redux/hooks"
import {selectProducts, STORE_PRODUCTS} from "../../../redux/slice/productSlice"
import {FILTER_BY_SEARCH, selectFilteredProducts} from "../../../redux/slice/filterSlice"
import {db, storage} from "../../../firebase/config"

const ViewProducts: FC = () => {

    const [search, setSearch] = useState<string>("")
    const {data, isLoading} = useFetchCollection("products")
    const products = useAppSelector(selectProducts)
    const filteredProducts = useAppSelector(selectFilteredProducts)

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage] = useState(10)
    // Get Current Products
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    )

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(
            STORE_PRODUCTS({
                products: data
            })
        )
    }, [dispatch, data])
    useEffect(() => {
        dispatch(FILTER_BY_SEARCH({products, search}))
    }, [dispatch, products, search])


    const confirmDelete = (id: string, imageURL: string) => {
        Notiflix.Confirm.show(
            "Delete Product",
            "You are about to delete this product?",
            "Delete",
            "Cancel",
            async function okCb() {
                await deleteProduct(id, imageURL)
            },
            function cancelCb() {
                console.log("Delete Canceled")
            },
            {
                width: "320px",
                borderRadius: "3px",
                titleColor: "darkred",
                okButtonBackground: "darkred",
                cssAnimationStyle: "zoom"
            },
        )
    }
    const deleteProduct = async (id: string, imageUrl: string) => {
        try {
            await deleteDoc(doc(db, "products", id))
            const storageRef = ref(storage, imageUrl)
            await deleteObject(storageRef)
            toast.success("Product delete successfully.")
        } catch (error) {
            if (error instanceof Error)
                toast.error(error.message)
        }
    }

    return (
        <section className={styles["view-products"]}>
            {isLoading && <Spinner/>}
            <h2>
                All Product items <span>{`${products.length}`}</span>
            </h2>
            <div className={styles.search}>
                <p>
                    <b>{filteredProducts.length}</b> products found
                </p>
                <Search value={search} onChange={(e: { target: { value: React.SetStateAction<string> } }) => setSearch(e.target.value)}/>
            </div>
            {filteredProducts.length === 0 ? (
                <p className={styles["not-found"]}>No product found.</p>
            ) : (
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>s/n</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentProducts.map((product, index: number) => {
                        const {id, name, price, imageURL, category} = product
                        return (
                            <tr key={id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={imageURL} alt={name} style={{width: "100px"}}/>
                                </td>
                                <td>{name}</td>
                                <td>{category}</td>
                                <td>{`$${price}`}</td>
                                <td>
                                    <CustomLink to={`/admin/add-product/${id}`}>
                                        <FaEdit size={20} color="green"/>
                                    </CustomLink>
                                    &nbsp;
                                    <FaTrashAlt size={20} className={styles.icon}
                                                onClick={() => confirmDelete(id, imageURL)}/>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            )}
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                productsPerPage={productsPerPage}
                totalProducts={filteredProducts.length}
            />
        </section>
    )
}

export default ViewProducts