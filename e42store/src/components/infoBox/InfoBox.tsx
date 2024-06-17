import React, {FC, ReactNode} from "react"
import {Card} from "../index"
import styles from "./InfoBox.module.scss"

interface InfoBoxProps {
    className: string
    title: string
    count: number | string
    icon: ReactNode
}

const InfoBox: FC<InfoBoxProps> = (infoBox) => {

    const {className, title, count, icon} = infoBox

    return (
        <div className={styles["info-box"]}>
            <Card className={className} width={"100%"} height={"100px"} column>
                <h4>{title}</h4>
                <span>
                     <h3> {count}</h3>
                    {icon}
                </span>
            </Card>
        </div>
    )
}

export default InfoBox