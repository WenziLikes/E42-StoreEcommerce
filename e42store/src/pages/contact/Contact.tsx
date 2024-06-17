import React from "react"
import styles from "./Contact.module.scss"
import {FaLinkedinIn, FaTwitter} from "react-icons/fa"
import {FaSquareFacebook, FaSquareGithub} from "react-icons/fa6"
import {Link} from "react-router-dom"
import {CustomLink} from "../../components"

const Contact = () => {
    return (
        <div className={`container ${styles.contact}`}>
            <h1>E42Store</h1>
            <div className={styles.content}>
                <h2>Contact Us</h2>
                <div className={styles.block}>
                    <h4>Address</h4>
                    <p>Unit 67 Suite 6 The Business Centre</p>
                    <p>4256 Montserrat Road</p>
                    <p>Canada</p>
                    <p>L2R 042</p>
                </div>
                <div className={styles.block}>
                    <h4>Call us</h4>
                    <p>+1 (435) 227 42 56</p>
                    <p>Monday - Friday: 9:00AM to 6:00PM</p>
                </div>
                <div className={styles.block}>
                    <h4>Email us</h4>
                    <CustomLink to={"mailto:viacheslavmurakhin@icloud.com"} className={styles.email}>
                        EFor2Store@shop.com
                    </CustomLink>
                </div>
                <div className={styles.block}>
                    <Link to={"https://twitter.com/"} target="_blank" rel="noreferrer noopener">
                        <FaTwitter className={styles.contactIcon}/>
                    </Link>
                    <Link to={"https://www.facebook.com/ViacheslavMurakhin/"} target="_blank"
                          rel="noreferrer noopener">
                        <FaSquareFacebook className={styles.contactIcon}/>
                    </Link>
                    <Link to={"https://github.com/WenziLikes"} target="_blank" rel="noreferrer noopener">
                        <FaSquareGithub className={styles.contactIcon}/>
                    </Link>
                    <Link to="https://www.linkedin.com/in/viacheslav-murakhin/" target="_blank"
                          rel="noreferrer noopener">
                        <FaLinkedinIn className={styles.contactIcon}/>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Contact