import React, {FC, FormEvent, useEffect, useRef, useState} from "react"
import styles from "./ContactForm.module.scss"
import {Button} from "../../index"
import emailjs from "@emailjs/browser"
import {toast} from "react-toastify"

interface ContactFormProps {
    onClose: () => void
}

const ContactForm: FC<ContactFormProps> = ({onClose}) => {
    const form = useRef<HTMLFormElement>(null)
    const [isVisible, setIsVisible] = useState<boolean>(true)

    const sendEmail = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (form.current) {
            emailjs
                .sendForm(
                    process.env.REACT_APP_EMAIL_JS_SERVICE_ID!,
                    process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID!,
                    form.current, {
                    publicKey: process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY,
                })
                .then(
                    () => {
                        form.current?.reset() // Reset the form
                        toast.success("Message sent successfully!")
                        handleClose()
                    },
                    (error) => {
                        toast.error(error.text)
                    }
                )
        }
    }

    const handleClose = () => {
        setIsVisible(false)
    }

    useEffect(() => {
        if (!isVisible) {
            const timeout = setTimeout(onClose, 500) // Duration of the CSS transition
            return () => clearTimeout(timeout)
        }
    }, [isVisible, onClose])

    return (
        <div className={`${styles["contact-form"]} ${isVisible ? styles.visible : styles.hidden}`}>
            <div className={styles["close-btn"]} onClick={handleClose}>
                ×
            </div>

            <form ref={form} onSubmit={sendEmail}>
                <h2>Contact Us</h2>
                <label>Name</label>
                <input type="text" name="user_name" placeholder="Full Name" required/>
                <label>Email</label>
                <input type="email" name="user_email" placeholder="Your active email" required/>
                <label>Subject</label>
                <input type="text" name="subject" placeholder="Subject" required/>
                <label>Message</label>
                <textarea name="message" required></textarea>
                <Button type="submit">Send Message</Button>
            </form>
        </div>
    )
}

export default ContactForm