import React from "react"
import styles from "./Footer.module.scss"
import {CustomLink} from "../index"

const Footer = () => {
    const date = new Date()
    const year = date.getFullYear()

    return (
        <footer className={styles.footer} id="footer">
            <div className="container">
                <p>
                    «Ideally, your work should be in line with your purpose.»
                </p>
                <span>
                <CustomLink to={"mailto:viacheslavmurakhin@icloud.com"} className={styles.email}>
                    🌱©️{year} Viacheslav Murakhin
                </CustomLink>
            </span>
            </div>
        </footer>
    )
}

export default Footer