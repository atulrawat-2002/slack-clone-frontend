import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useSignup } from '@/hooks/apis/auth/useSignup'
import { TriangleAlert } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SigninCard = () => {

    const navigate = useNavigate();

    const [signinForm, setSigninForm] = useState({
        email: '',
        password: '',
    })

    const [validationError, setValidationError] = useState(null);
    const { isPending, isSuccess, error, signupMutation } = useSignup();
 
    async function onSignupFormSubmit(e) {
        e.preventDefault();

        if( !signinForm.email || !signinForm.password ) {
            console.error('All fields are required');
            setValidationError({
                message: 'All fields are required'
            })
            return;
        }

        setValidationError(null)

    }

  return (
    <Card className="w-full h-full" >

        <CardHeader>
            <CardTitle className='text-2xl font-bold text-center' > Sign In </CardTitle>
            <CardDescription className="text-center my-2" > Sign In to access your account </CardDescription>

            {
            validationError && (
                <div className='bg-red-300/15 flex items-center gap-x-2 p-5 rounded-md mb-6 ' >
                        <TriangleAlert size="20" className='text-red-400' />
                        <p className='text-red-500' >  {validationError?.message} </p>
                </div>
            )
        }

        </CardHeader>

        <CardContent>
            <form className='space-y-4' onSubmit={onSignupFormSubmit}>

                    <Input 
                        placeholder='email'
                        required
                        onChange={(e) => setSigninForm({
                            ...signinForm,
                            email: e.target.value
                        })}
                        value={signinForm.email}
                        type='email'
                        disabled={false}
                    />
                    <Input 
                        placeholder='password'
                        required
                        onChange={(e) => setSigninForm({
                            ...signinForm,
                            password: e.target.value
                        })}
                        value={signinForm.password}
                        type='password'
                        disabled={false}
                    />
                    

                    <Button
                        size='lg'
                        type="submit"
                        disabled={false}
                        className="w-full"
                    > Continue </Button>

            </form>

                    <Separator  className="my-5" />

                    <p
                        className='text-s text-muted-foreground mt-4'
                    >
                        New to platform ? {' '}
                        <span
                        onClick={() => navigate('/auth/signup')} 
                        className='text-sky-600 hover:underline cursor-pointer' >  Sign Up </span>
                    </p>

        </CardContent>

    </Card>
  )
}

export default SigninCard;