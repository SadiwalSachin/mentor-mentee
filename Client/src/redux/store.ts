import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import messageReducer from "./slices/messageSlice"
import socketReducer from "./slices/socketSlice"

const store = configureStore({
    reducer:{
        userReducer,
        messageReducer,
        socketReducer
    }
})

export default  store