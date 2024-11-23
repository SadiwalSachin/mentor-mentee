import {createSlice} from "@reduxjs/toolkit"

const socketSlice = createSlice({
    name:"socketSlice",
    initialState:{
        socket:null,
        onlineUsers:null
    },
    reducers:{
        setSocket:function(state,action){
            state.socket = action.payload
        },
        setOnlineUsers:function(state,action){
            state.onlineUsers = action.payload
        }
    }
})
export const {setSocket,setOnlineUsers} = socketSlice.actions
export default socketSlice.reducer
