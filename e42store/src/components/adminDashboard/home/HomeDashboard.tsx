import React, {useEffect} from "react"
import styles from "./HomeDashboard.module.scss"
import {Chart, InfoBox} from "../../index"
import {AiFillDollarCircle} from "react-icons/ai"
import {BsCart4} from "react-icons/bs"
import {FaCartArrowDown} from "react-icons/fa"
import {useFetchCollection} from "../../../customHooks"
import {useAppDispatch, useAppSelector} from "../../../redux/hooks"
import {selectProducts, STORE_PRODUCTS} from "../../../redux/slice/productSlice"
import {
    CALC_TOTAL_ORDER_AMOUNT,
    selectOrderHistory,
    selectTotalOrderAmount,
    STORE_ORDERS
} from "../../../redux/slice/orderSlice"

// Icons
const earningIcon = <AiFillDollarCircle size={30} className={styles.icon}/>
const productIcon = <BsCart4 size={30} className={styles.icon}/>
const ordersIcon = <FaCartArrowDown size={30} className={styles.icon}/>

const HomeDashboard = () => {

    const products = useAppSelector(selectProducts)
    const orders = useAppSelector(selectOrderHistory)
    const totalOrderAmount = useAppSelector(selectTotalOrderAmount)

    // Todo Any type remember!!!
    const fbProducts = useFetchCollection("products")
    const {data} = useFetchCollection("orders")

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(STORE_PRODUCTS({
            products: fbProducts.data
        }))
        dispatch(STORE_ORDERS(data))

        dispatch(CALC_TOTAL_ORDER_AMOUNT())
    }, [dispatch, data, fbProducts])


    return (
        <div className={styles["home-dashboard"]}>
            <h2>Admin Home</h2>
            <div className={styles["info-box"]}>
                <InfoBox
                    className={`${styles.card} ${styles.card1}`}
                    title={"Earnings"}
                    count={`$${totalOrderAmount}`}
                    icon={earningIcon}
                />
                <InfoBox
                    className={`${styles.card} ${styles.card2}`}
                    title={"Products"}
                    count={products.length}
                    icon={productIcon}
                />
                <InfoBox
                    className={`${styles.card} ${styles.card3}`}
                    title={"Orders"}
                    count={orders.length}
                    icon={ordersIcon}
                />
            </div>
            <div>
                <Chart/>
            </div>
        </div>
    )
}

export default HomeDashboard