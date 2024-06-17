import {createSlice} from "@reduxjs/toolkit"
import {AuthState} from "../../product.type"

const initialState: AuthState = {
    isLoggedIn: false,
    email: null,
    userName: null,
    userID: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_ACTIVE_USER: (state, action) => {
            const {email, userName, userID} = action.payload
            state.isLoggedIn = true
            state.email = email
            state.userName = userName
            state.userID = userID
        },
        REMOVE_ACTIVE_USER: (state) => {
            state.isLoggedIn = false
            state.email = null
            state.userName = null
            state.userID = null
        },
    },
})

export const {SET_ACTIVE_USER, REMOVE_ACTIVE_USER} = authSlice.actions

export const selectIsLoggedIn = (state: { auth: AuthState }) => state.auth.isLoggedIn
export const selectEmail = (state: { auth: AuthState }) => state.auth.email
export const selectUserName = (state: { auth: AuthState }) => state.auth.userName
export const selectUserID = (state: { auth: AuthState }) => state.auth.userID

export default authSlice.reducer