import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'

const Login = () => {

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  }
  const [credentials, setCredentials] = React.useState({
    email: '',
    password: ''
  });

  console.log(".env", import.meta.env.VITE_URL);

  const handleSubmit = async (event) => { 
    try {
      event.preventDefault();
      const response = await axios.post(`${import.meta.env.VITE_URL}/login`, credentials);
      console.log(response.data?.token);
        localStorage.setItem('token', response?.data?.token);

        if(response?.data?.token){
          window.location.href = '/';
        }

 
    }catch (error) {
      console.error('Login failed:', error);
      // Handle login error here
    }
  }

  console.log("token", localStorage.getItem('token'));
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="email" onChange={handleChange} name='email' autoComplete="email" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name='password'
                        onChange={handleChange}
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type='submit'  color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
  className="text-white bg-primary py-5 shadow-lg"
  style={{
    width: '44%',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #0062E6, #33AEFF)',
  }}
>
  <CCardBody className="text-center">
    <div>
      <h2
        style={{
          marginTop: '30px',
          fontSize: '1.8rem',
          fontWeight: '700',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          letterSpacing: '0.5px',
        }}
      >
        SPB & GI Cancer Summit 2025
      </h2>
      <p
        style={{
          fontSize: '1.1rem',
          marginTop: '10px',
          color: '#f8f9fa',
          opacity: 0.9,
        }}
      >
        Welcome to the Admin Dashboard
      </p>
    </div>
  </CCardBody>
</CCard>

            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
