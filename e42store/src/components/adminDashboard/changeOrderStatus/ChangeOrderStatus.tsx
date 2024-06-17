import React, {FC, useState} from "react"
import styles from "./ChangeOrderStatus.module.scss"
import {Button, Card, Loader} from "../../index"
import {doc, setDoc, Timestamp} from "firebase/firestore"
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"
import {db} from "../../../firebase/config"
import {OrderState} from "../../../product.type"

interface ChangeOrderStatusProps {
    order: OrderState
    id: string
}

const ChangeOrderStatus: FC<ChangeOrderStatusProps> = ({order, id}) => {

    const [status, setStatus] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    const editOrder = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
        e.preventDefault()

        setIsLoading(true)

        const orderConfig = {
            userID: order.userID,
            userEmail: order.userEmail,
            orderDate: order.orderDate,
            orderTime: order.orderTime,
            orderAmount: order.orderAmount,
            orderStatus: status,
            cartItems: order.cartItems,
            shippingAddress: order.shippingAddress,
            createdAt: order.createdAt,
            editedAt: Timestamp.now().toDate(),
        }
        try {

            await setDoc(doc(db, "orders", id!), orderConfig)
            toast.success("Order status changes successfully")
            setIsLoading(false)
            navigate("/admin/orders")
        } catch (error) {
            setIsLoading(false)
            toast.error(error instanceof Error ? error.message : "An error has occurred")
        }
    }

    return (
        <>
            {isLoading && (<Loader/>)}
            <Card className={styles.card} width={"100%"} maxWidth={"400px"} column>
                <h4>Update Status</h4>
                <form onSubmit={(e) => editOrder(e, id)}>
                    <span>
                        <select value={status}
                                onChange={(e) => setStatus(e.target.value)}>
                            <option value="" disabled>-- Choose one --</option>
                            <option value="Order Placed...">Order Placed...</option>
                            <option value="Processing...">Processing...</option>
                            <option value="Shipped...">Shipped...</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </span>
                    <span>
                        <Button type="submit" width={"50%"} variantBgColor={"darkBlue"}>
                            Update Status
                        </Button>
                    </span>
                </form>
            </Card>
        </>
    )
}

export default ChangeOrderStatus