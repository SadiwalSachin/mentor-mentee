import { setOtherUsers } from '../redux/slices/userSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, UseDispatch } from 'react-redux'

const useGetOtherUser = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchOtherUser = async () => {
            try {
                axios.defaults.withCredentials = true
                const response = await axios.get("url",)
                console.log("response coming while fetching other user :- ",response);
                dispatch(setOtherUsers(response.data.data.allusers))
            } catch (error) {
                console.log("Error occured while fetching other user data :-",error);
            }
        }
        fetchOtherUser()
    },[])
}

export default useGetOtherUser
