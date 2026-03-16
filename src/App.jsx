import { Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/auth/Auth'
import SignupCard from './components/organisms/auth/SignupCard'
import SigninCard from './components/organisms/auth/SigninCard'
import Notfound from './pages/Notfound/Notfound'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from "@/components/ui/sonner"

function App() {

  const queryClient = new QueryClient();

  return (
    <>  
       
      
        <QueryClientProvider client={queryClient} >
          <Toaster position="top-center" className="text-black"/>
        <Routes>

          <Route path='/auth/signup' element={<Auth> <SignupCard /> </Auth>} />
          <Route path='/auth/signin' element={<Auth> <SigninCard /> </Auth>} />
          <Route path='/*' element={<Notfound />} />

        </Routes>
        </QueryClientProvider>

     </>
  ) 

}

export default App
