import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useSignup } from '@/hooks/apis/auth/useSignup'
import { LucideLoader2, TriangleAlert } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'

const SignupCard = () => {

    const navigate = useNavigate()

    const [signupForm, setSignupForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
    })

    const [validationError, setValidationError] = useState(null);
    const { isPending, isSuccess, error, signupMutation } = useSignup();

    
    async function onSignupFormSubmit(e) {
        e.preventDefault();

        if( !signupForm.email || !signupForm.password || !signupForm.confirmPassword || !signupForm.username ) {
            console.error('All fields are required');
            setValidationError({
                message: 'All fields are required'
            })
            return;
        }

        if (signupForm.password !== signupForm.confirmPassword) {
            console.error('Password do not match');
            setValidationError({
                message: 'Password do not match'
            })
            return;
        }

        setValidationError(null);

        await signupMutation({
            email: signupForm.email,
            password: signupForm.password,
            username: signupForm.username
        })

    }

    useEffect(() => {
        console.log('console log inside useeffect of signup');
        if(isSuccess) {
            setTimeout(() => {
                navigate('/auth/signin');
            }, 3000);
        }
            
    }, [isSuccess])

  return (
    <Card className="w-full h-full" >

        <CardHeader>
            <CardTitle className='text-2xl font-bold text-center' > Sign Up </CardTitle>
            <CardDescription className="text-center my-2" > Sign Up to access your account </CardDescription>

        {
            validationError && (
                <div className='bg-red-300/15 flex items-center gap-x-2 p-5 rounded-md mb-6 ' >
                        <TriangleAlert size="20" className='text-red-400' />
                        <p className='text-red-500' >  {validationError?.message} </p>
                </div>
            )
        }

        {
            error && (
                <div className='bg-red-300/15 flex items-center gap-x-2 p-5 rounded-md mb-6 ' >
                        <TriangleAlert size="20" className='text-red-400' />
                        <p className='text-red-500' >  {error?.message} </p>

                </div>
            )
        }

        {
            isSuccess && <div className='bg-slate-300 p-2 rounded-md flex flex-row text-slate-900 items-center gap-x-2 text-sm text-primary mb-5'  >
                <FaCheck />
                <p>Successfully signed up. You will be redirected to login page</p>
                <LucideLoader2 className='animate-spin' />

            </div>
        }

        </CardHeader>

        <CardContent>
            <form action="" className='space-y-4' onSubmit={onSignupFormSubmit} >

                    <Input 
                        placeholder='email'
                        required
                        onChange={(e) => setSignupForm({
                            ...signupForm,
                            email: e.target.value
                        })}
                        value={signupForm.email}
                        type='email'
                        disabled={isPending}
                    />
                    <Input 
                        placeholder='password'
                        required
                        onChange={(e) => setSignupForm({
                            ...signupForm,
                            password: e.target.value
                        })}
                        value={signupForm.password}
                        type='password'
                        disabled={isPending}
                    />
                    <Input 
                        placeholder='Confirm password'
                        required
                        onChange={(e) => setSignupForm({
                            ...signupForm,
                            confirmPassword: e.target.value
                        })}
                        value={signupForm.confirmPassword}
                        type='password'
                        disabled={isPending}
                    />
                    <Input 
                        placeholder='username'
                        required
                        onChange={(e) => setSignupForm({
                            ...signupForm,
                            username: e.target.value
                        })}
                        value={signupForm.username}
                        type='text'
                        disabled={isPending}
                    />

                    <Button
                        size='lg'
                        type="submit"
                        disabled={isPending}
                        className="w-full"
                    > Continue </Button>

            </form>

                    <Separator  className="my-5" />

                    <p
                        className='text-s text-muted-foreground mt-4'
                    >
                        Already Have an account? {' '}
                        <span 
                        onClick={() => navigate('/auth/signin')} 
                        className='text-sky-600 hover:underline cursor-pointer' >  Sign In </span>
                    </p>

        </CardContent>

    </Card>
  )
}

export default SignupCard