import {Middleware} from "@reduxjs/toolkit"

const loggerMiddleware: Middleware = (storeAPI) => (next) => (action) => {
    // console.log("dispatching", action)
    const result = next(action)
    // console.log("next state", storeAPI.getState())
    return result
}

export default loggerMiddleware