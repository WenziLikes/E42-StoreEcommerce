import React from "react"
import styles from "./Chart.module.scss"
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from "chart.js"
import {Bar} from "react-chartjs-2"
import {Card} from "../index"
import {useAppSelector} from "../../redux/hooks"
import {selectOrderHistory} from "../../redux/slice/orderSlice"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface Order {
    orderStatus: string
}

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: false,
            text: "Chart.js Bar Chart",
        },
    },
}

const Chart: React.FC = () => {
    const orders = useAppSelector((state) => selectOrderHistory(state)) as Order[]

    // Create a new array of order status
    const array: string[] = []
    orders.map((item) => {
        const {orderStatus} = item
        return array.push(orderStatus)
    })

    const getOrderCount = (arr: string[], value: string): number => {
        return arr.filter((n) => n === value).length
    }

    const [q1, q2, q3, q4] = [
        "Order Placed...",
        "Processing...",
        "Shipped...",
        "Delivered",
    ]

    const placed = getOrderCount(array, q1)
    const processing = getOrderCount(array, q2)
    const shipped = getOrderCount(array, q3)
    const delivered = getOrderCount(array, q4)

    const data = {
        labels: ["Placed Orders", "Processing", "Shipped", "Delivered"],
        datasets: [
            {
                label: "Order count",
                data: [placed, processing, shipped, delivered],
                backgroundColor: [
                    "rgba(147, 198, 229, 100)",
                    "rgba(49, 147, 205, 100)",
                    "rgba(20, 60, 84, 100)",
                    "rgba(140, 116, 108, 100)",
                ],
            },
        ],
    }

    return (
        <div className={styles.charts}>
            <Card className={styles.card} column>
                <h3>Order Status Chart</h3>
                <Bar options={options} data={data}/>
            </Card>
        </div>
    )
}

export default Chart