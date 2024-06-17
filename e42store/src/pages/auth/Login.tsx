import React, {SyntheticEvent, useState} from "react"
import styles from "./Auth.module.scss"
import loginImg from "../../assets/login.jpg"
import googleIcon from "../../../../e42store/src/assets/googleIcon.svg"
import {useNavigate} from "react-router-dom"
import {GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from "firebase/auth"
import {toast} from "react-toastify"
import {Button, Card, CustomLink, Loader} from "../../components"
import {useAppSelector} from "../../redux/hooks"
import {selectPreviousURL} from "../../redux/slice/cartSlice"
import {auth} from "../../firebase/config"

const Login = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const previousURL = useAppSelector(selectPreviousURL)
    const navigate = useNavigate()

    const redirectUser = () => {
        if (previousURL.includes("cart")) {
            return navigate("/cart")
        } else {
            navigate("/")
        }
    }

    const loginUser = (e: SyntheticEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const target = e.target as typeof e.target & {
            email: { value: string }
            password: { value: string }
        }
        const email = target.email.value
        const password = target.password.value

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setIsLoading(false)
                toast.success("Login Successful...")
                redirectUser()
            })
            .catch((error) => {
                setIsLoading(false)
                const errorCode = error.code
                const errorMessage = error.message
                toast.error(errorMessage)
                toast.error(errorCode)
            })
    }

    /** Login with Google */
    const provider = new GoogleAuthProvider()
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then(() => {
                toast.success("Login Successfully")
                redirectUser()
            }).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message

            toast.error(errorMessage)
            toast.error(errorCode)
        })
    }

    return (
        <>
            {isLoading && <Loader/>}
            <section className={`container ${styles.auth}`}>
                <Card className={styles.card} height={"510px"} width={"60%"}>
                    <div className={`${styles.form}`}>
                        <form onSubmit={loginUser}>

                            <h2>Welcome back</h2>
                            <p>Glad to see you! Please enter your details...</p>

                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="email"
                                       id="email"
                                       name="email"
                                       placeholder="Your email"
                                       required/>
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
                                <CustomLink to="/reset">Reset Password</CustomLink>
                            </div>

                            <Button type="submit" width={"90%"} variantBgColor={"darkBlue"}>
                                Sign in
                            </Button>
                            <Button width={"90%"}
                                    onClick={signInWithGoogle}>
                                <img src={googleIcon} alt="iconGoogle" width={18}/>
                                Sign in with Google
                            </Button>
                            {/* Todo Apple with Sign In, Remember!!!! */}
                            <span>
                            <p>Don"t have an account?
                                <CustomLink to="/register">Sign up for here</CustomLink>
                            </p>
                        </span>
                        </form>
                    </div>
                    <div className={`${styles.img}`}>
                        <img src={loginImg} alt="Login"/>
                    </div>
                </Card>
            </section>
        </>
    )
}

export default Login