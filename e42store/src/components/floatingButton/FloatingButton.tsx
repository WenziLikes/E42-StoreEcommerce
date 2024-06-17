import React, {FC} from "react"
import styles from "./FloatingButton.module.scss"

interface FloatingButtonProps {
    onClick: () => void
}

const FloatingButton: FC<FloatingButtonProps> = ({onClick}) => {
    return <button className={styles["floating-btn"]} onClick={onClick}>+</button>
}

export default FloatingButton