import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name:"messageSlice",
    initialState:{
        messages:null
    },
    reducers:{
        setMessages:function(state,action){
            state.messages = action.payload
        }
    }
})

export const {setMessages} = messageSlice.actions
export default messageSlice.reducer