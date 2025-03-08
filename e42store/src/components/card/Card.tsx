import React, {CSSProperties, FC, ReactNode} from "react"
import styles from "./Card.module.scss"

interface CardProps {
    children: ReactNode
    className?: string
    height?: string
    maxHeight?: string
    maxWidth?: string
    width?: string
    column?: boolean
}

const Card: FC<CardProps> = ({children, className = "", height, maxHeight, width, maxWidth, column = false}) => {
    const cardStyle: CSSProperties = {
        height: height || "auto",
        maxHeight: maxHeight || "auto",
        width: width || "auto",
        maxWidth: maxWidth || "auto",
        display: "flex",
        flexDirection: column ? "column" : "row"
    }

    return (
        <div className={`${styles.card} ${className}`} style={cardStyle}>
            {children}
        </div>
    )
}

export default Card