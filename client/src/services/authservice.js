import { userLogin } from '../redux/features/auth/authAction';
import store from '../redux/store';

export const handleLogin = (e, role, email, password) =>{
    e.preventDefault();
    try{
        if(!role || !email || !password){
        return alert('Please provide all Field')}
        store.dispatch(userLogin(role,email,password))
        console.log('login', e, email, role, password)
    }catch(error){
        console.log(error);
    }
}
export const handleRegister = (name,email,e, role, password,organisationName,hospitalName,address,website, phone) =>{
 e.preventDefault();
    try{
        console.log('register', e, email,organisationName,hospitalName,address,website, phone,name, role, password)
    }catch(error){
        console.log(error);
    }
}