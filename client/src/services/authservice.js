import { userLogin, userRegister } from '../redux/features/auth/authAction';
import store from '../redux/store.js';

export const handleLogin = (e, role, email, password) =>{
    e.preventDefault();
    try{
        if(!role || !email || !password){
        return alert('Please provide all Field')}
        store.dispatch(userLogin({role,email,password}))
        console.log('login', e, email, role, password)
    }catch(error){
        console.log(error);
    }
}
// export const handleRegister = (e,role,name,email, password,organisationName,hospitalName,address,website, phone) =>{
//   e.preventDefault();
//     try{
//       store.dispatch(userRegister({role,name,email, password,organisationName,hospitalName,address,website, phone}))
//     }catch(error){
//         console.log(error);
//     }
// }
export const handleRegister = (e, role, name, email, password, organisationName, hospitalName, address, website, phone) => {
  e.preventDefault();
  try {
    if (!role || !name || !email || !password) {
      alert('Please provide all fields');
      return;
    }

    // Make sure 'role' is one of the valid values: "admin", "organisation", "donar", or "hospital"
    const validRoles = ["admin", "organisation", "donar", "hospital"];
    if (!validRoles.includes(role)) {
      alert('Invalid role');
      return;
    }

    store.dispatch(userRegister({
      role,
      name,
      email,
      password,
      organisationName,
      hospitalName,
      address,
      website,
      phone
    }));
  } catch (error) {
    console.log(error);
  }
}
