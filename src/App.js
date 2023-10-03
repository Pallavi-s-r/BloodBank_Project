import {Routes, Route} from 'react-router-dom'
import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import PublicRoute from './components/Routes/PublicRoute';
import Donar from './pages/Dashboard/Donar';
import Hospital from './pages/Dashboard/Hospital';
import Organisation from './pages/Dashboard/Organisation';
import Consumer from './pages/Dashboard/Consumer';
import Donation from './pages/Dashboard/Donation';
import Analytics from './pages/Dashboard/Analytics';
import HospitalList from './pages/Admin/HospitalList';
import DonarList from './pages/Admin/DonarList';
import OrgList from './pages/Admin/OrgList';
import AdminHome from './pages/Admin/AdminHome';


function App() {
  return (
 <>
 <ToastContainer/>
  <Routes>
    <Route path='/' element={
  <ProtectedRoute><HomePage/></ProtectedRoute>

    
    }
    />
 
    <Route path='/donar' element={
  <ProtectedRoute><Donar/></ProtectedRoute>
}
    />
    <Route path='/hospital' element={
  <ProtectedRoute><Hospital/></ProtectedRoute> }
    />
    <Route path='/donar-List' element={
  <ProtectedRoute><DonarList/></ProtectedRoute> }
    />
    <Route path='/hospital-List' element={
  <ProtectedRoute><HospitalList/></ProtectedRoute> }
    />
    <Route path='/org-List' element={
  <ProtectedRoute><OrgList/></ProtectedRoute> }
    />
    <Route path='/admin' element={
  <ProtectedRoute><AdminHome/></ProtectedRoute> }
    />

    <Route path='/analytics' element={
  <ProtectedRoute><Analytics/></ProtectedRoute> }
    />

    <Route path='/organisation' element={
  <ProtectedRoute><Organisation/></ProtectedRoute> }
    />
    <Route path='/consumer' element={
  <ProtectedRoute><Consumer/></ProtectedRoute> }
    />

     <Route path='/donation' element={
  <ProtectedRoute><Donation/></ProtectedRoute> }
    />

    < Route path='/login' element={
   <PublicRoute> <Login/></PublicRoute>
   }/>
    < Route path='/register' element={
     
      <PublicRoute><Register/></PublicRoute>
  
    }/>
  </Routes>
 </>
  );
}

export default App;
