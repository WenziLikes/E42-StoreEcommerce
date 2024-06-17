import React, {SyntheticEvent, useState} from "react"
import styles from "./Auth.module.scss"
import {useNavigate} from "react-router-dom"
import registerImg from "../../assets/register.jpg"
import {createUserWithEmailAndPassword} from "firebase/auth"
import {toast} from "react-toastify"
import {Button, Card, CustomLink, Loader} from "../../components"
import {auth} from "../../firebase/config"

const Register = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const registerUser = (e: SyntheticEvent) => {
        e.preventDefault()
        const target = e.target as typeof e.target & {
            email: { value: string }
            password: { value: string }
            confirmPassword: { value: string }
        }
        const email = target.email.value
        const password = target.password.value
        const confirmPassword = target.confirmPassword.value

        if (password !== confirmPassword) {
            toast.error("Password do not match.")
        }

        setIsLoading(true)

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log(user)

                setIsLoading(false)
                toast.success("Register successful...")
                navigate("/login")

            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message

                toast.error(errorMessage)
                toast.error(errorCode)
                setIsLoading(false)
            })

    }

    return (
        <>
            {isLoading && <Loader/>}
            <section className={`container ${styles.auth}`}>
                <Card className={styles.card} height={"510px"} width={"60%"}>
                    <div className={`${styles.img}`}>
                        <img src={registerImg} alt="Register"/>
                    </div>
                    <div className={`${styles.form}`}>
                        <form onSubmit={registerUser}>
                            <div>
                                <h2>Register</h2>
                                <p>Welcome!!! to registration page</p>
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="email"
                                       id="email"
                                       name="email"
                                       placeholder="Your email"
                                       required
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                       id="password"
                                       name="password"
                                       placeholder="Your password"
                                       required/>
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password"
                                       id="confirmPassword"
                                       name="confirmPassword"
                                       placeholder="Please repeat password"
                                       required/>
                            </div>

                            <Button type="submit" width={"90%"}>
                                Register
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

export default Register