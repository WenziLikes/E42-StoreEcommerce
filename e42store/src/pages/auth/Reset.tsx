import React, {SyntheticEvent, useState} from "react"
import styles from "./Auth.module.scss"
import resetImg from "../../assets/reset.jpg"
import {useNavigate} from "react-router-dom"
import {sendPasswordResetEmail} from "firebase/auth"
import {toast} from "react-toastify"
import {Button, Card, CustomLink, Loader} from "../../components"
import {auth} from "../../firebase/config"

const Reset = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const resetPassword = (e: SyntheticEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const target = e.target as typeof e.target & {
            email: { value: string }
        }
        const email = target.email.value

        sendPasswordResetEmail(auth, email)
            .then(() => {
                setIsLoading(false)
                toast.success("Check your email for a reset link")
            })
            .catch((error) => {
                setIsLoading(false)
                const errorCode = error.code
                const errorMessage = error.message
                toast.error(errorMessage)
                toast.error(errorCode)
            })
        navigate("/login")
    }
    return (
        <>
            {isLoading && <Loader/>}
            <section className={`container ${styles.auth}`}>
                <Card className={styles.card} height={"510px"} width={"60%"}>
                    <div className={`${styles.img}`}>
                        <img src={resetImg} alt="Reset Password"/>
                    </div>
                    <div className={`${styles.form}`}>
                        <form onSubmit={resetPassword}>
                            <div>
                                <h2>Reset Password</h2>
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="email"
                                       id="email"
                                       name="email"
                                       placeholder="Your email"
                                       required/>
                            </div>

                            <Button type="submit" width={"90%"}>
                                Reset Password
                            </Button>
                            <span>
                            <p>Already an account?
                                <CustomLink to="/login">Login</CustomLink>
                            </p>
                        </span>
                        </form>
                    </div>
                </Card>
            </section>
        </>
    )
}

export default Reset