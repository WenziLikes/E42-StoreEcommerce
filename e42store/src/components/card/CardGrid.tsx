import React, {FC, ReactNode} from "react"
import styles from "./CardGrid.module.scss"

interface CardGridProps {
    children: ReactNode
    className?: string
    isGridMode?: boolean
}

const CardGrid: FC<CardGridProps> = ({children, isGridMode, className = ""}) => {
    const gridClasses = `${styles["card-grid"]} ${isGridMode ? styles.grid : styles.line}  ${className} `
    return (
        <div
            className={gridClasses}>
            {children}
        </div>
    )
}

export default CardGrid