import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth/Auth'
import SignupCard from './components/organisms/auth/SignupCard'
import Notfound from './pages/Notfound/Notfound'
import SigninCard from './components/organisms/auth/SigninCard'
import ProtectedRoute from './components/molecules/protectedRoutes/ProtectedRoute'
import Home from './pages/home/Home'
import { WorksaceLayout } from './pages/workspace/Layout'
import { JoinPage } from './pages/workspace/JoinPage'
import { Channel } from './pages/channel/Channel'
import { Dm } from './pages/dm/Dm'

const AppRoutes = () => {
  return (
    <>

       <Routes>
          <Route path='/' element={<Navigate to='/auth/signin' replace />} />

          <Route path='/auth/signup' element={<Auth> <SignupCard /> </Auth>} />

          <Route path='/auth/signin' element={<Auth> <SigninCard /> </Auth>} />

          <Route path='/home' element={ <ProtectedRoute> <Home /> </ProtectedRoute> } />

          <Route path='/workspace/:workspaceId' element={ <ProtectedRoute> <WorksaceLayout>{false}</WorksaceLayout> </ProtectedRoute> } />

          <Route path='/workspace/:workspaceId/channels/:channelId' element={ <ProtectedRoute> <WorksaceLayout> <Channel /> </WorksaceLayout> </ProtectedRoute> } />

          <Route path='/dms/:userId' element={ <ProtectedRoute> <WorksaceLayout> <Dm /> </WorksaceLayout> </ProtectedRoute> } />

          <Route path='/workspace/join/:workspaceId' element={<ProtectedRoute> <JoinPage /> </ProtectedRoute>} />

          <Route path='/*' element={<Notfound />} />

        </Routes> 

    </>
  )
}

export default AppRoutes