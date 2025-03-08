import React, {FC, useEffect, useState} from "react"
import styles from "./Header.module.scss"
import {AdminLinkButton, Logo, ShoppingCart} from "./index"
import {useLocation, useNavigate} from "react-router-dom"
import {onAuthStateChanged, signOut} from "firebase/auth"
import {toast} from "react-toastify"
import {ShowOnLogin, ShowOnLogout} from "./hiddenLink/HiddenLink"
import {CustomNavLink} from "./../index"
import {FaTimes} from "react-icons/fa"
import {useAppDispatch, useAppSelector} from "../../redux/hooks"
import {CALCULATE_TOTAL_QUANTITY, selectCartTotalQuantity} from "../../redux/slice/cartSlice"
import {auth} from "../../firebase/config"
import {REMOVE_ACTIVE_USER, SET_ACTIVE_USER} from "../../redux/slice/authSlice"


const Header: FC = () => {

    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [displayName, setDisplayName] = useState<string>("")
    const [scrollPage, setScrollPage] = useState<boolean>(false)
    const navigate = useNavigate()
    const location = useLocation();

    const cartTotalQuantity = useAppSelector(selectCartTotalQuantity)

    const dispatch = useAppDispatch()

    const fixHeader = () => {
        if (window.scrollY > 120) {
            setScrollPage(true)
        } else {
            setScrollPage(false)
        }
    }
    window.addEventListener("scroll", fixHeader)

    useEffect(() => {
        dispatch(CALCULATE_TOTAL_QUANTITY())
    }, [dispatch])

    /** Monitor currently sign in user */
    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            if (user) {
                const u1 = user.email?.substring(0, user.email?.indexOf("@"))!
                const uName = u1.charAt(0).toUpperCase() + u1.slice(1)
                setDisplayName(user.displayName || uName)

                dispatch(
                    SET_ACTIVE_USER({
                        email: user.email,
                        userName: user.displayName || uName,
                        userID: user.uid,
                    })
                )
            } else {
                setDisplayName("")
                dispatch(REMOVE_ACTIVE_USER())
            }
        })
    }, [dispatch])
    const toggleMenu = () => setShowMenu(!showMenu)
    const hideMenu = () => setShowMenu(false)
    const logoutUser = () => {
        signOut(auth)
            .then(() => {
                toast.success("Logout successfully.")
                navigate("/")
            }).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            toast.error(errorMessage)
            toast.error(errorCode)
        })
    }

    return (
        <header className={scrollPage ? `${styles.fixed}` : ""}>
            {/*    Logo */}
            <Logo/>
            {/*    Navigation */}
            <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>
                <div className={showMenu
                    ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                    : `${styles["nav-wrapper"]}`} onClick={hideMenu}>
                </div>

                <ul>
                    <li className={styles["logo-mobile"]}>
                        <Logo/>
                        <FaTimes size={22} color={"#fff"} onClick={hideMenu}/>
                    </li>

                    <li>
                        {/*Admin panel */}
                        {location.pathname === "/" ? null : <AdminLinkButton/>}

                    </li>
                </ul>

                <div className={styles["header-right"]} onClick={hideMenu}>
                <span className={styles.links}>
                     <ShowOnLogin>
                         <CustomNavLink to={"/"}>Home</CustomNavLink>
                     </ShowOnLogin>
                    <ShowOnLogout>
                         <CustomNavLink to={"/login"}>Login</CustomNavLink>
                    </ShowOnLogout>
                    <ShowOnLogout>
                         <CustomNavLink to={"/contact"}>Contact Us</CustomNavLink>
                    </ShowOnLogout>
                </span>
                    {/*<ShowOnLogout>*/}
                    {/*    <ShoppingCart cartTotalQuantity={cartTotalQuantity}/>*/}
                    {/*</ShowOnLogout>*/}
                </div>

                <div className={styles["header-right"]} onClick={hideMenu}>
                    <span className={styles.links}>
                        <ShowOnLogin>
                            <CustomNavLink to="/username" className={styles["user-display-name"]}>
                                Hi , {displayName}
                            </CustomNavLink>
                        </ShowOnLogin>
                        <ShowOnLogin>
                            <CustomNavLink to={"/profile"}>Profile</CustomNavLink>
                        </ShowOnLogin>
                         <ShowOnLogin>
                             <CustomNavLink to="/order-history">My Orders</CustomNavLink>
                        </ShowOnLogin>
                        <ShowOnLogin>
                            <CustomNavLink to={"/out"} onClick={logoutUser}>Logout</CustomNavLink>
                        </ShowOnLogin>
                    </span>
                </div>
            </nav>
            <ShoppingCart cartTotalQuantity={cartTotalQuantity} toggleMenu={toggleMenu}/>
        </header>
    )
}

export default Header