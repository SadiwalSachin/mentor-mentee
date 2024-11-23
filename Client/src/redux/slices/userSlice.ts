import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"userSlice",
    initialState:{
        // user details after login
        userDetials:{},

        // these isLoggedIn and token are for route protecting
        isLoggedIn:false,
        token:"",

        userEmail:"",

        // selected user for chat
        selectedUserForChat:null,
        otherUsers:null
    },
    reducers:{
        setUserDetails:function(state,action){
            state.userDetials = action.payload
        },
        setIsLoggedIn:function(state,action){
            state.isLoggedIn = action.payload
        },
        setToken:function(state,action){
            state.token = action.payload
        },
        setUserEmail:function(state,action){
            state.userEmail = action.payload
        },
        setSelectedUserForChat:function(state,action){
            state.selectedUserForChat= action.payload
        },
        setOtherUsers:function(state,action){
            state.otherUsers = action.payload
        }
    }
})

export const {setIsLoggedIn,setUserDetails,setToken,setUserEmail,setSelectedUserForChat,setOtherUsers} = userSlice.actions
export default userSlice.reducer