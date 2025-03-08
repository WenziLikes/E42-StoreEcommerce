import {FC, ReactNode} from "react"
import {useAppSelector} from "../../../redux/hooks"
import {selectIsLoggedIn} from "../../../redux/slice/authSlice"

type ShowOnLoginProps = {
    children: ReactNode
}

export const ShowOnLogin: FC<ShowOnLoginProps> = ({children}) => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    return isLoggedIn ? <>{children}</> : null
}

export const ShowOnLogout: FC<ShowOnLoginProps> = ({children}) => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    return !isLoggedIn ? <>{children}</> : null
}