import React, {FC, useCallback} from "react"
import styles from "./ProductItem.module.scss"
import {Button, Card, CustomLink} from "../../index"
import {Product} from "../../../product.type"
import {useAppDispatch} from "../../../redux/hooks"
import {ADD_TO_CART, CALCULATE_TOTAL_QUANTITY} from "../../../redux/slice/cartSlice"

interface ProductItemProps {
    grid: boolean
    product: Product
}

const ProductItem: FC<ProductItemProps> = ({grid, product}) => {
    const {
        id,
        name,
        price,
        desc = "", // ✅ Prevents an error if `Desc` is absent
        imageURL,
    } = product

    const dispatch = useAppDispatch()

    const shortenText = (text: string, n: number) => {
        return text.length > n ? text.substring(0, n).concat("...") : text
    }

    const addToCart = useCallback(() => {
        dispatch(ADD_TO_CART(product))
        dispatch(CALCULATE_TOTAL_QUANTITY())
    }, [dispatch, product]) // ✅ Optimized with `usecallback ()`

    return (
        <Card className={styles.productItem} height={grid ? "355px" : "400px"} column>
            <CustomLink to={`/product-details/${id}`}>
                <div className={styles.img}>
                    <img src={imageURL} alt={name}/>
                </div>
            </CustomLink>
            <div className={styles.content}>
                <div className={styles.details}>
                    <p>{`$${price}`}</p>
                    <h4>{shortenText(name, 12)}</h4> {/* ✅ Increased the limit of symbols */}
                </div>
                {!grid && <p className={styles.desc}>{shortenText(desc, 200)}</p>}
                <Button width={grid ? "50%" : "30%"} onClick={addToCart}>Add To
                    Cart</Button> {/* ✅ Optimized `OnClick` */}
            </div>
        </Card>
    )
}

export default ProductItem