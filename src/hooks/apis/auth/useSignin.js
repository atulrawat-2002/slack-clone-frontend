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

            setAuth({
              user: response.data,
              token: response.data.token,
              isLoading: false
            })

            toast("signed in successfully", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
        },
        onError: (error) => {
            console.log("Error in use signin hook ", error)
             toast(error.message, {
          description: "None",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
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