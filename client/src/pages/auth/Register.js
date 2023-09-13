import React from 'react'
import Form from '../../components/shared/form/Form'

const Register = () => {
  return (
    <>
    <div className='row g-0'>
      <div className='col-md-7 form-banner'>
        <img src='./assests/img2.jpg' alt='register' />
      </div>

      <div className='col-md-5 form-container'>
        <Form formTitle={'Register'} submitBtn={'Register'} formType={'register'}/>
      </div>
    </div>
    </>
  )
}

export default Register