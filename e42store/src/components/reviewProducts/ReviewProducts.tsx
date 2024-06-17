import React, {FormEvent, useEffect, useState} from "react"
import styles from "./ReviewProducts.module.scss"
import {Button, Spinner} from "../index"
import StarsRating from "react-star-rate"
import {addDoc, collection, Timestamp} from "firebase/firestore"
import {toast} from "react-toastify"
import {useFetchDocument, useIdParam} from "../../customHooks"
import {Product} from "../../product.type"
import {useAppSelector} from "../../redux/hooks"
import {selectUserID, selectUserName} from "../../redux/slice/authSlice"
import {db} from "../../firebase/config"

const ReviewProducts = () => {

    const id = useIdParam()
    const {document} = useFetchDocument<Product>({collectionName: "products", documentID: `${id}`})
    const [product, setProduct] = useState<Product | null>(null)
    const userID = useAppSelector(selectUserID)
    const userName = useAppSelector(selectUserName)

    useEffect(() => {
        if (document) {
            setProduct(document)
        }
    }, [document])

    const [rate, setRate] = useState<number>(0)
    const [review, setReview] = useState<string>("")

    const submitReview = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const today = new Date()
        const date = today.toDateString()
        const reviewConfig = {
            userID,
            userName,
            productID: id,
            rate,
            review,
            reviewDate: date,
            createdAt: Timestamp.now().toDate(),
        }
        try {
            await addDoc(collection(db, "reviews"), reviewConfig)
            toast.success("Review submitted successfully")
            setRate(0)
            setReview("")
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "An error has occurred")
        }
    }

    return (
        <section>
            <div className={`container ${styles.review}`}>
                <div>
                    <h2>Rate This Product</h2>
                    {product === null ? (
                        <Spinner/>
                    ) : (
                        <>
                            <p>
                                <b>Product name:</b> {product.name}
                            </p>
                            <div className={styles.img}>
                                <img src={product.imageURL} alt={product.name}/>
                            </div>
                        </>
                    )}
                </div>
                <div className={styles.rate}>
                    <form onSubmit={submitReview}>
                        <label>Rating:</label>
                        <StarsRating
                            value={rate}
                            onChange={(newRate: number | undefined) => {
                                if (newRate !== undefined) {
                                    setRate(newRate)
                                }
                            }}
                        />
                        <label>Review:</label>
                        <textarea
                            onChange={(e) => setReview(e.target.value)}
                            value={review}
                            required
                            cols={30}
                            rows={10}
                        />
                        <Button type="submit" width={"60%"}>Submit</Button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ReviewProducts