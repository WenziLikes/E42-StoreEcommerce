import React, {ButtonHTMLAttributes, CSSProperties, FC} from "react"
import styles from "./Button.module.scss"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    customProp?: string
    className?: string
    onClick?: () => void
    variantBgColor?: "default" | "darkBlue" | "noBackground" | "green" | "yellow"  // Add a button color option
    width?: string | number // Add a prop for the button width
}

const Button: FC<ButtonProps> = ({
                                     customProp,
                                     className = "",
                                     onClick,
                                     variantBgColor = "default", // Use the default option by default
                                     width,
                                     ...props
                                 }) => {

    const buttonStyle: CSSProperties = width ? {width} : {} // Apply width style if width is given
    return (
        <button
            onClick={onClick}
            className={`${styles.btn} ${variantBgColor !== "default" ? styles[variantBgColor] : ""} ${className}`}
            style={buttonStyle}// Apply the button width style
            {...props}
        >
            {customProp ? customProp : props.children}
        </button>
    )
}

export default Button