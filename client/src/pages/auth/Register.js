import React from 'react'
import Form from '../../components/shared/form/Form'
import Spinner from '../../components/shared/form/spinner'
import { useSelector } from 'react-redux'

const Register = () => {
  const {loading, error} = useSelector(state =>state.auth)
  return (
    <>
     {error && <span>{alert(error)}</span>}
    {loading ? <Spinner/>:(
    <div className='row g-0'>
      <div className='col-md-7 form-banner'>
        <img src='./assests/img2.jpg' alt='register' />
      </div>

      <div className='col-md-5 form-container'>
        <Form formTitle={'Register'} submitBtn={'Register'} formType={'register'}/>
      </div>
    </div>)}
    </>
  )
}

export default Register