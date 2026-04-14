import { useMutation } from "@tanstack/react-query";
import { signInRequest } from "@/apis/auth";
import { toast } from "sonner";
import { useAuth } from "@/hooks/context/useAuth";


export const useSignin = () => {
    const {setAuth} = useAuth()
    const { isPending, isSuccess, error, mutateAsync: signinMutation } = useMutation({
        mutationFn: signInRequest,
        onSuccess: (response) => {
            const data = JSON.stringify(response.data);
            localStorage.setItem('user', data);
            localStorage.setItem('token', JSON.stringify(response.data.token));

            setAuth(() => {
                console.log("Setting Auth", response?.data);
                return {
                  user: response.data,
                  token: response.data.token,
                  isLoading: false
                }

            })

            toast("signed in successfully", {
              description: new Date().toLocaleString(),
              action: {
            label: "Hide",
            onClick: () => {},
          },
            })
        },
        onError: (error) => {
            console.log("Error in use signin hook ", error)
            toast(error.message, {
            description: new Date().toLocaleString(),
           action: {
            label: "Hide",
            onClick: () => {},
          },
        })
        }
    })

    return { 
        isPending, 
        isSuccess, 
        error, 
        signinMutation 
    }
}