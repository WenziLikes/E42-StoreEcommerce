import React, {ChangeEvent, FormEvent, useState} from "react"
import styles from "./AddProduct.module.scss"
import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from "firebase/storage"
import {toast} from "react-toastify"
import {addDoc, collection, doc, setDoc, Timestamp} from "firebase/firestore"
import {useNavigate} from "react-router-dom"
import {Button, Spinner} from "../../index"
import {useIdParam} from "../../../customHooks"
import {categories, Product} from "../../../product.type"
import {useAppSelector} from "../../../redux/hooks"
import {selectProducts} from "../../../redux/slice/productSlice"
import {db, storage} from "../../../firebase/config"


const initialState: Product = {
    id: "",
    name: "",
    imageURL: "",
    price: 0,
    category: "",
    brand: "",
    desc: "",
    createdAt: null
}

const AddProduct = () => {

    const id = useIdParam()
    const navigate = useNavigate()
    const products = useAppSelector(selectProducts)
    const productEdit = products.find((item) => item.id === id)!

    const [product, setProduct]
        = useState<Product>(() => detectForm(`${id}`, {...initialState}, productEdit))


    const [uploadProgress, setUploadProgress] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    function detectForm(id: string, f1: any, f2?: any) {
        return id === "ADD" ? f1 : f2 ?? f1
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target
        setProduct({...product, [name]: value})
    }
    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]!
        console.log(file)
        if (!file) return

        const storageRef = ref(storage, `e42Store/${Date.now()}${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setUploadProgress(progress)
            },
            (error) => {
                toast.error(error.message)
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                setProduct({...product, imageURL: downloadURL})
                setImagePreview(downloadURL)
                toast.success("Image uploaded successfully.")
            }
        )
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const productData = {
            name: product.name,
            imageURL: product.imageURL,
            price: Number(product.price),
            category: product.category,
            brand: product.brand,
            desc: product.desc,
            createdAt: Timestamp.now().toDate(),
        }

        try {
            if (id === "ADD") {
                await addDoc(collection(db, "products"), productData)
                setProduct({...initialState})
                toast.success("Product uploaded successfully.")
            } else {
                if (product.imageURL !== productEdit.imageURL) {
                    const storageRef = ref(storage, productEdit.imageURL)
                    await deleteObject(storageRef)
                }
                await setDoc(doc(db, "products", `${id}`), {
                    ...productData,
                    createdAt: productEdit.createdAt,
                    editedAt: Timestamp.now().toDate(),
                })
                toast.success("Product edited successfully.")
            }
            setIsLoading(false)
            navigate("/admin/all-products")
        } catch (error) {
            setIsLoading(false)
            toast.error(error instanceof Error ? error.message : "An error occurred")
        }
    }

    return (
        <>
            {isLoading && <Spinner/>}
            <div className={styles["add-product"]}>
                <h2>{detectForm(`${id}`, "Add New Product", "Edit Product")}</h2>
                {/* Form Add Product */}
                <form onSubmit={handleSubmit}>
                    <div className={styles["left"]}>
                        <label>Product name:</label>
                        <input type="text"
                               placeholder="Product name"
                               onChange={handleInputChange}
                               required name="name" value={product.name}/>
                        <label>Product price:</label>
                        <input type="number"
                               placeholder="Product price"
                               onChange={handleInputChange}
                               required name="price" value={product.price || ""}/>

                        <label>Product category:</label>
                        <select required name="category"
                                value={product.category}
                                onChange={handleInputChange}>
                            <option value="" disabled>
                                -- choose product category
                            </option>
                            {categories.map((cat) => {
                                return (
                                    <option value={cat.name} key={cat.id}>{cat.name}</option>
                                )
                            })}
                        </select>

                        <label>Product Company / Brand:</label>
                        <input type="text"
                               placeholder="Product brand"
                               onChange={handleInputChange}
                               required name="brand" value={product.brand}/>

                        <Button>
                            {detectForm(`${id}`, "Save Product", "Edit Product")}
                        </Button>
                    </div>
                    <div className={styles["right"]}>
                        <fieldset className={styles["product-img"]}>
                            <legend>Product Image:</legend>
                            <div className={styles.group}>
                                {imagePreview && <img src={imagePreview} alt="Preview"
                                                      style={{maxWidth: "200px", maxHeight: "200px"}}/>}
                                {uploadProgress === 0 ? null : (
                                    <div className={styles.progress}>
                                        <div
                                            className={styles["progress-bar"]}
                                            style={{width: `${uploadProgress}%`}}
                                        >
                                            {uploadProgress < 100
                                                ? `Uploading ${uploadProgress}`
                                                : `Upload Complete ${uploadProgress}%`}
                                        </div>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    placeholder="Product Image"
                                    name="image"
                                    onChange={handleImageChange}
                                />
                                {product.imageURL === "" ? null : (
                                    <input
                                        type="text"
                                        required
                                        placeholder="Image URL"
                                        name="imageURL"
                                        value={product.imageURL}
                                        disabled
                                    />
                                )}
                            </div>
                        </fieldset>
                        <label>Product Description:</label>
                        <textarea name="desc"
                                  className={styles["product-desc"]}
                                  required
                                  value={product.desc}
                                  onChange={handleInputChange}>
                        </textarea>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddProduct