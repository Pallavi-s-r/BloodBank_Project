import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../services/api'
import { toast } from 'react-toastify'

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ role, email, password }, { rejectWithValue }) => {
        try {
            const { data } = await API.post('/auth/login', { role, email, password })

            //store token 
            if (data.success) {
                localStorage.setItem('token', data.token)
                toast.success(data.message)
                window.location.replace('/');
                console.log(data.token)
            }
            console.log(data)
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            }
            else {
                return rejectWithValue(error.message)
            }
        }
    }
)

//register

export const userRegister = createAsyncThunk('auth/register', async({ role,name,email,password, organasiationName, hospitalName,  website, address, phone},{rejectWithValue})=>{
try{
    const {data} = await API.post('/auth/register',{
       role,name,email,password, organasiationName, hospitalName,  website, address, phone 
    })
    if(data?.success){
        alert("user registered")
        toast.success(data.message);
        window.location.replace('/login');
    }
    console.log(data)
}catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            }
            else {
                return rejectWithValue(error.message)
            }
        }
} )

//current user
export const getCurrentUser = createAsyncThunk(
    'auth/currentUser', 
    async({rejectWithValue})=>{
try{

    const res = await API.get('/auth/currentUser')
    if(res?.data){
        return res?.data;
    }
}catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            }
            else {
                return rejectWithValue(error.message)
            }
        }
    }
)

