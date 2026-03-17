import { useAuth } from '@/hooks/context/useAuth'
import { Navigate } from 'react-router-dom';
import { Spinner } from "@/components/ui/spinner"

const ProtectedRoute = ( { children } ) => {
  
    const { auth } = useAuth();

    if( auth.isLoading ) {
        return <div className='flex items-center justify-center text-2xl'  >

            <span>Loading</span><Spinner className="size-6" />

        </div>
    }

    if( !auth.user || !auth.token ) {
        return <Navigate to='/auth/signin' />
    }

    return children;

}

export default ProtectedRoute