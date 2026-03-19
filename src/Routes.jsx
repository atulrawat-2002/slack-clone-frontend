import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from './pages/auth/Auth'
import SignupCard from './components/organisms/auth/SignupCard'
import Notfound from './pages/Notfound/Notfound'
import SigninCard from './components/organisms/auth/SigninCard'
import ProtectedRoute from './components/molecules/protectedRoutes/ProtectedRoute'
import Home from './pages/home/Home'

const AppRoutes = () => {
  return (
    <>

       <Routes>

          <Route path='/auth/signup' element={<Auth> <SignupCard /> </Auth>} />
          <Route path='/auth/signin' element={<Auth> <SigninCard /> </Auth>} />
          <Route path='/home' element={ <ProtectedRoute> <Home /> </ProtectedRoute> } />
          <Route path='/*' element={<Notfound />} />

        </Routes> 

    </>
  )
}

export default AppRoutes