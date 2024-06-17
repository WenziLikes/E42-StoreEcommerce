import {FC, JSX} from "react"
import {useAppSelector} from "../../../../../e42store/src/redux/hooks"
import {selectIsLoggedIn} from "../../../../../e42store/src/redux/slice/authSlice"

type ShowOnLogin = {
    children: JSX.Element
}

const ShowOnLogin: FC<ShowOnLogin> = ({children}) => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    if (isLoggedIn) {
        return children
    }
    return null
}

export const ShowOnLogout: FC<ShowOnLogin> = ({children}) => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    if (!isLoggedIn) {
        return children
    }
    return null
}

export default ShowOnLogin