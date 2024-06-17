import React, {FC, ReactNode, useCallback, useEffect, useState} from "react"
import {useLocation} from "react-router-dom"

interface ScrollToTargetProps {
    targetId: string
    scrollOffset?: number
    children?: ReactNode
}

const ScrollToTarget: FC<ScrollToTargetProps> = ({targetId, scrollOffset = 0, children}) => {

    const location = useLocation()
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
        const handleLoad = () => setLoaded(true)

        window.addEventListener("load", handleLoad)

        return () => {
            window.removeEventListener("load", handleLoad)
        }
    }, [])

    const scrollToElement = useCallback(() => {
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
            const yOffset = targetElement.getBoundingClientRect().top + window.scrollY - scrollOffset
            window.scrollTo({top: yOffset, behavior: "smooth"})
        }
    }, [targetId, scrollOffset])

    useEffect(() => {
        if (loaded && location.hash === `#${targetId}`) {
            scrollToElement()
        }
    }, [loaded, location.hash, scrollToElement,targetId])

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        scrollToElement()
    }

    return (
        <a href={`#${targetId}`} onClick={handleClick}>
            {children ? children : "Scroll Down"}
        </a>
    )
}

export default ScrollToTarget