import React from 'react'
import Layout from '../../components/shared/Layout/LAyout'
import { useSelector } from 'react-redux/es/hooks/useSelector'

const AdminHome = () => {
    const {user} = useSelector((state)=>state.auth)
  return (
    <Layout>
        <div className='container'>
            <div className='d-flex'>
                <h1>Welcome Admin</h1>
                <h3> Manage blood bank app</h3>
                <p>lorem ipsum dolor sit amet, consectetur adip non pro id  adip euismod</p>    
                
            </div>
        </div>
    </Layout>
  )
}

export default AdminHome