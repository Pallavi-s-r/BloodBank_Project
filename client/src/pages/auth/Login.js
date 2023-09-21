import React from 'react'
import Form  from '../../components/shared/form/Form'
import {useSelector} from 'react-redux'
import Spinner from '../../components/shared/form/spinner'
// import InputType from '../../components/shared/form/inputType'


const Login = () => {

    const {loading, error} = useSelector(state=>state.auth)

    return (
        <>
        {error && <span>{alert(error)}</span>}
        {loading ? <Spinner/>:(
        
            <div className='row g-0'>
                <div className='col-md-7 form-banner'>
                    <img src='./assests/img3.jpg' alt='login' />
                </div>
                <div className='col-md-5 form-container'>
                  {/* <form>
<InputType labelText={'Email'} labelFor={'forEmail'} inputType={'email'} name={'name'}/> */} 

<Form  formTitle={'Login Page'} submitBtn={'Login'} formType={'login'}/>
                        {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                    

                </div>
            </div>
        )}
        </>
    )
}

export default Login