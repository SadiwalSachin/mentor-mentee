import { setMessages } from '../redux/slices/messageSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector , useDispatch } from 'react-redux'

const useGetMessages = () => {

    const dispatch = useDispatch()
    const {selectedUserForChat} = useSelector((state)=>state.userReducer)

    useEffect(()=>{
        const fetchMessages = async () => {
            // yaha par messages ko het karte wakt dhyan rakhna hai url me selected user ki id bhejni hai
           try {
             const res = await axios.get(`http://loaclhost:7878/api/v1/message/get-message/${selectedUserForChat?._id}`)
             console.log("response came while fetching all the messages in useGetMessagesHook :- ",res);
             dispatch(setMessages(res.data.messages))
           } catch (error) {
            console.log("Error occured while fetching all the messages in useGetMessagesHook :- ",error);
           }
        }

        fetchMessages()

    },[selectedUserForChat])
}

export default useGetMessages
