import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useSignin } from '@/hooks/apis/auth/useSignin'
import { LucideLoader2, TriangleAlert } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'


const SigninCard = () => {

    const navigate = useNavigate();

    const [signinForm, setSigninForm] = useState({
        email: '',
        password: '',
    })

    const [validationError, setValidationError] = useState(null);
    const { isPending, isSuccess, error, signinMutation } = useSignin();
 
    async function onSigninFormSubmit(e) {
        e.preventDefault();
        console.log('sending request for signin')

        if( !signinForm.email || !signinForm.password ) {
            console.error('All fields are required');


            setValidationError({
                message: 'All fields are required'
            })
            return;
        }

        await signinMutation({
            email: signinForm.email,
            password: signinForm.password
        })
        setValidationError(null)
        

    }

    useEffect(() => {

        if(isSuccess) {
            setTimeout(() => {
                navigate('/home')
            }, 2000);
        }
            

    }, [isSuccess])
 
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
                <p>Successfully signed in. You will be redirected to login page</p>
                <LucideLoader2 className='animate-spin' />

            </div>
        }

        </CardHeader>

        <CardContent>
            <form className='space-y-4' onSubmit={onSigninFormSubmit}>

                    <Input 
                        placeholder='email'
                        required
                        onChange={(e) => setSigninForm({
                            ...signinForm,
                            email: e.target.value
                        })}
                        value={signinForm.email}
                        type='email'
                        disabled={isPending}
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