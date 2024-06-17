import styles from "./ProductDetails.module.scss"
import React, {useEffect, useRef, useState} from "react"
import {Button, Card, CustomLink, Spinner} from "../../index"
import {RxDoubleArrowLeft} from "react-icons/rx"
import StarsRating from "react-star-rate"
import {useFetchCollection, useFetchDocument, useIdParam} from "../../../customHooks"
import {useAppDispatch, useAppSelector} from "../../../redux/hooks"
import {ADD_TO_CART, CALCULATE_TOTAL_QUANTITY, DECREASE_CART, selectCartItems} from "../../../redux/slice/cartSlice"
import {Product} from "../../../product.type"

const ProductDetails = () => {
    const id = useIdParam()
    const [product, setProduct] = useState<Product | null>(null)
    const [lensPosition, setLensPosition] = useState({left: 0, top: 0})
    const [backgroundPosition, setBackgroundPosition] = useState("0% 0%")
    const [showLens, setShowLens] = useState(false)
    const imgRef = useRef<HTMLDivElement>(null)
    const lensRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()
    const cartItems = useAppSelector(selectCartItems)
    const {document} = useFetchDocument<Product>({collectionName: "products", documentID: `${id}`})
    const {data} = useFetchCollection("reviews")
    const filteredReviews = data.filter((review) => review.productID === id)

    const cart = cartItems.find((cart) => cart.id === id)
    const isCartAdded = cartItems.findIndex((cart) => cart.id === id)

    useEffect(() => {
        if (document) {
            setProduct(document)
        }
    }, [document])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (imgRef.current && lensRef.current) {
            const {left, top, width, height} = imgRef.current.getBoundingClientRect()
            const lensWidth = lensRef.current.offsetWidth
            const lensHeight = lensRef.current.offsetHeight

            let x = e.pageX - left - lensWidth / 2
            let y = e.pageY - top - lensHeight / 2

            // Prevent the lens from going outside the image
            if (x > width - lensWidth) x = width - lensWidth
            if (x < 0) x = 0
            if (y > height - lensHeight) y = height - lensHeight
            if (y < 0) y = 0

            setLensPosition({left: x, top: y})

            const posX = (x / width) * 100
            const posY = (y / height) * 100
            setBackgroundPosition(`${posX}% ${posY}%`)
        }
    }

    const handleImageClick = () => {
        setShowLens(!showLens)
    }

    const addToCart = (product: Product) => {
        dispatch(ADD_TO_CART(product))
        dispatch(CALCULATE_TOTAL_QUANTITY())
    }

    const decreaseCart = (product: Product) => {
        dispatch(DECREASE_CART(product))
        dispatch(CALCULATE_TOTAL_QUANTITY())
    }

    return (
        <section>
            <div className={`container ${styles.productDetails}`}>
                <h2>Product Details</h2>
                {/*<ScrollToTarget targetId={"products"}>*/}
                {/*    <CustomLink to="/#products" className={styles["back-to"]}>Back to Products</CustomLink>*/}
                {/*    <RxDoubleArrowLeft size={22} className={styles.icon}/>*/}
                {/*</ScrollToTarget>*/}
                {product === null ? (
                    <Spinner/>
                ) : (
                    <div className={styles.details}>
                        <div className={styles["img-container"]}>
                            <div
                                className={`${styles.img} ${showLens ? styles.active : ""}`}
                                onMouseMove={handleMouseMove}
                                onClick={handleImageClick}
                                ref={imgRef}
                            >
                                <img src={product.imageURL} alt={product.name}/>
                                {showLens && (
                                    <>
                                        <div
                                            className={styles["zoom-lens"]}
                                            ref={lensRef}
                                            style={{left: lensPosition.left, top: lensPosition.top}}
                                        ></div>
                                        <div
                                            className={styles["zoom-result"]}
                                            style={{
                                                backgroundImage: `url(${product.imageURL})`,
                                                backgroundPosition: backgroundPosition
                                            }}
                                        ></div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className={styles.content}>
                            <h3>{product.name}</h3>
                            <p className={styles.price}>{`$${product.price}`}</p>
                            <p className={styles.desc}>{product.desc}</p>
                            <p>
                                <b>SKU</b> {product.id}
                            </p>
                            <p>
                                <b>Brand</b> {product.brand}
                            </p>
                            <div className={styles.count}>
                                {isCartAdded < 0 ? null : (
                                    <>
                                        <Button width={"6%"} onClick={() => decreaseCart(product)}>-</Button>
                                        <p>
                                            <b>{cart?.cartQuantity}</b>
                                        </p>
                                        <Button width={"6%"} onClick={() => addToCart(product)}>+</Button>
                                    </>
                                )}
                            </div>
                            <Button width={"30%"} onClick={() => addToCart(product)}>Add To Cart</Button>
                        </div>
                    </div>
                )}
                <CustomLink to="/#products" className={styles["back-to"]}>
                    <RxDoubleArrowLeft size={22} className={styles.icon}/>
                    Back to Products
                </CustomLink>
                <Card className={styles.card} width={"90%"} column>
                    <h3>Product Reviews</h3>
                    {filteredReviews.length === 0 ? (
                        <p>There are no reviews for this product yet.</p>
                    ) : (
                        <>
                            {filteredReviews.map((item, index) => {
                                const {rate, review, reviewDate, userName} = item
                                return (
                                    <div key={index} className={styles.review}>
                                        <StarsRating value={rate}/>
                                        <p>{review}</p>
                                        <span><b>{reviewDate}</b></span>
                                        <br/>
                                        <span><b>by: {userName}</b></span>
                                    </div>
                                )
                            })}
                        </>
                    )}
                </Card>
            </div>
        </section>
    )
}

export default ProductDetails

