import React from 'react'
import { useState } from 'react'
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
import { jwtDecode } from "jwt-decode";


import { toast } from "react-toastify"

const Login = () => {

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  }
  const [credentials, setCredentials] = React.useState({
    email: '',
    password: ''
  });

  const[error, setError] = useState("");

  console.log(".env", import.meta.env.VITE_URL);

  const handleSubmit = async (event) => { 
    try {
      event.preventDefault();
      const response = await axios.post(`${import.meta.env.VITE_URL}/login`, credentials);
  
      const token = response?.data?.token;
      if (token) {
        localStorage.setItem('token', token);
  
        const decoded = jwtDecode(token);
        const userRole = decoded?.role;
  
        if (userRole) {
          localStorage.setItem('role', userRole);
        }
  
        toast.success("Login success!");
        window.location.href = '/';
      }
  
    } catch (error) {
      console.error('Login failed:', error);
      toast.error(error?.response?.data?.message);
      setError(error?.response?.data?.message);
    }
  };

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
        HPB & GI Cancer Surgery Summit 2025
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
