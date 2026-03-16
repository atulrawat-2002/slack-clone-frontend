import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Notfound = () => {

    const navigate = useNavigate();

  return (
    <div className='flex justify-center items-center h-screen w-full flex-col bg-gray-100' > 
        
        <Card className='text-center shadow-lg max-w-lg' >   

            <CardHeader>
                <CardTitle> 404 Not Found </CardTitle>
                <p className='text-gray-600' > The page you are looking for does not exist </p>
            </CardHeader>

            <CardContent>
    
                <img
                className='rounded-lg shadow-lg' 
                src="https://www.digitalmesh.com/blog/wp-content/uploads/2020/05/404-error.jpg" alt="image" />

                <Button 
                    onClick={() => navigate(-1)}
                variant='outline' className="mt-4" > Go Back </Button>
            </CardContent>

        </Card>

    </div>
  )
}

export default Notfound