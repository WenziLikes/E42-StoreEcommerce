import React, {FC, ReactNode, useEffect, useRef, useState} from "react"
import styles from "./Accordion.module.scss"

interface AccordionProps {
    title: string
    children: ReactNode
}

const Accordion: FC<AccordionProps> = ({title, children}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const contentRef = useRef<HTMLDivElement | null>(null)
    const uniqueId = useRef(`accordion-trigger-${Math.random().toString(36).slice(2, 9)}`).current

    const handleToggle = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        if (isOpen && contentRef.current) {
            contentRef.current.scrollIntoView({behavior: "smooth"})
        }
    }, [isOpen])

    return (
        <div className={styles.accordion}>
            <h4 className={styles["accordion__header"]}>{title}</h4>
            <div className={styles["accordion__title-wrapper"]} onClick={handleToggle}>
                <label className={styles["accordion__title"]} htmlFor={uniqueId}>
                    DRAWER THREE
                </label>
            </div>
            <div
                className={`${styles["accordion__content-wrapper"]} ${isOpen ? styles.open : ""}`}
                ref={contentRef}
            >
                <div className={styles["accordion__content"]}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Accordion