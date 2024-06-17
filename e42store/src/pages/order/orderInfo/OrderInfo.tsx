import React, {FC} from "react"
import styles from "../../cart/Cart.module.scss"
import {Button, CustomLink} from "../../../components"
import {CartItem, OrderState} from "../../../product.type"

const OrderInfo: FC<{ order: OrderState }> = ({order}) => (
    <>
        <p><b>Order ID:</b> {order.id}</p>
        <p><b>Order Amount:</b> {order.orderAmount}</p>
        <p><b>Order Status:</b> {order.orderStatus}</p>
        <table>
            <thead>
            <tr>
                <th>s/n</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {order.cartItems.map((cart: CartItem, index: number) => {
                const {id, name, price, imageURL, cartQuantity} = cart
                return (
                    <tr key={id}>
                        <td>
                            <b>{index + 1}</b>
                        </td>
                        <td>
                            <p>
                                <b>{name}</b>
                            </p>
                            <img
                                src={imageURL}
                                alt={name}
                                style={{width: '100px'}}
                            />
                        </td>
                        <td>{price}</td>
                        <td>{cartQuantity}</td>
                        <td>{(price * cartQuantity).toFixed(2)}</td>
                        <td className={styles.icons}>
                            <CustomLink to={`/review-product/${id}`}>
                                <Button width={'100%'} variantBgColor={'darkBlue'}>
                                    Review Product
                                </Button>
                            </CustomLink>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    </>
)

export default OrderInfo