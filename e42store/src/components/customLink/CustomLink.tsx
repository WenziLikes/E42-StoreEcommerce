import {Link, LinkProps} from "react-router-dom"
import React, {FC, ReactNode} from "react"
import styles from "./Link.module.scss"
import classNames from "classnames" // To handle className merging

interface CustomLinkProps extends LinkProps {
    className?: string
    style?: React.CSSProperties
    children: ReactNode
    target?: string
    withBorder?: boolean
    onClick?: () => void
}

const CustomLink: FC<CustomLinkProps> = ({
                                             to,
                                             className = "",
                                             style,
                                             children,
                                             target,
                                             withBorder = false,
                                             onClick,
                                             ...rest
                                         }) => {

    const combinedClassName = classNames(className, styles.link, {
        [styles.withBorder]: withBorder, // Conditional class based on withBorder
    })

    return (
        <Link
            to={to}
            className={combinedClassName}
            style={style}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : ""}
            onClick={onClick}
            {...rest}
        >
            {children}
        </Link>
    )
}

export {CustomLink}