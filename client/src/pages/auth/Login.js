import React from 'react'
import Form  from '../../components/shared/form/Form'
// import InputType from '../../components/shared/form/inputType'


const Login = () => {
    return (
        <>
            <div className='row g-0'>
                <div className='col-md-7 form-banner'>
                    <img src='./assests/img3.jpg' alt='login image' />
                </div>
                <div className='col-md-5 form-container'>
                  {/* <form>
<InputType labelText={'Email'} labelFor={'forEmail'} inputType={'email'} name={'name'}/> */} 

<Form  formTitle={'Login Page'} submitBtn={'Login'} formType={'login'}/>
                        {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                    

                </div>
            </div>
        </>
    )
}

export default Login