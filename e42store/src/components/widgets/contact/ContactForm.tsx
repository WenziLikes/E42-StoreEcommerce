import React, {FC, FormEvent, useEffect, useRef, useState} from "react"
import styles from "./ContactForm.module.scss"
import {Button} from "../../index"
import emailJs from "@emailjs/browser"
import {toast} from "react-toastify"

interface ContactFormProps {
    onClose: () => void
}

const ContactForm: FC<ContactFormProps> = ({onClose}) => {
    const form = useRef<HTMLFormElement>(null)
    const [isVisible, setIsVisible] = useState<boolean>(true)

    // ✅ We download the environment variables (works only in Vite!)
    const serviceId = import.meta.env.VITE_EMAIL_JS_SERVICE_ID!
    const templateId = import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID!
    const publicKey = import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY!

    const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!form.current) return

        try {
            await emailJs.sendForm(serviceId, templateId, form.current, {publicKey})
            form.current.reset()
            toast.success("✅ Message sent successfully!")
            handleClose()
        } catch (error: any) {
            console.error("EmailJS Error:", error)
            toast.error(`❌ Failed to send message: ${error?.message || "Unknown error"}`)
        }
    }

    const handleClose = () => {
        setIsVisible(false)
    }

    useEffect(() => {
        if (!isVisible) {
            const timeout = setTimeout(onClose, 500) // Учитываем анимацию
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