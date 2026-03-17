import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from "@/components/ui/sonner"
import { AppContextProvider } from './context/AppContextProvider'
import AppRoutes from './Routes';

function App() {

  const queryClient = new QueryClient();

  return (
    <>  
       
      
        <QueryClientProvider client={queryClient} >

          <AppContextProvider>

            <AppRoutes />

          <Toaster position="top-center" className="text-black"/>

          </AppContextProvider>

        </QueryClientProvider>

     </>
  ) 

}

export default App
