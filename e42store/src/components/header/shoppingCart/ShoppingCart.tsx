import React, {FC} from "react"
import styles from "./ShoppingCart.module.scss"
import {FaShoppingCart} from "react-icons/fa"
import {CustomLink} from "./../../index"
import {HiOutlineMenuAlt3} from "react-icons/hi"

interface ShoppingCartProps {
    toggleMenu?: () => void
    cartTotalQuantity: number
}

const ShoppingCart: FC<ShoppingCartProps> = ({toggleMenu, cartTotalQuantity}) => {
    return (
        <span className={styles["shopping-cart"]}>
            <CustomLink to={"/cart"}>
                Cart
                <FaShoppingCart/>
                <p>{cartTotalQuantity}</p>
            </CustomLink>
            <div className={styles["menu-icon"]}>
                <HiOutlineMenuAlt3 onClick={toggleMenu}/>
            </div>
        </span>
    )
}

export default ShoppingCart