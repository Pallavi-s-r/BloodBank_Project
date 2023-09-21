import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux';
import {getCurrentUser} from '../../redux/features/auth/authAction'
import API from '../../services/api';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const dispatch = useDispatch()

    //get current user
    const getUser = async() =>{
      try{
        const {data} = await API.get('/auth/currentUser')
        if(data?.success){
          dispatch(getCurrentUser(data))
        }
      }catch(error){
        localStorage.clear()
        console.log(error)
      }
    }

    useEffect(() => {
      getUser()
    })
    
 if(localStorage.getItem('token')){
  return children
 }else{
return <Navigate to='/login' />
 }
}

export default ProtectedRoute