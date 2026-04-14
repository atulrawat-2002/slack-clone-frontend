import { useMutation } from "@tanstack/react-query";
import { signUpRequest } from "@/apis/auth";
import { toast } from "sonner";
import { useAuth } from "@/hooks/context/useAuth";


export const useSignup = () => {
    const { setAuth } = useAuth();
    const { isPending, isSuccess, error, mutateAsync: signupMutation } = useMutation({
        mutationFn: signUpRequest,
        onSuccess: (response) => {
            const data = JSON.stringify(response.data);
            localStorage.setItem('user', data);
            localStorage.setItem('token', JSON.stringify(response.data.token));

            setAuth({
              user: response.data,
              token: response.data.token,
              isLoading: false
            })
            toast("Event has been created", {
              variant: "destructive",
              description: "Sunday, December 03, 2023 at 9:00 AM",
              action: {
                label: "Hide",
                onClick: () => console.log("Undo"),
              },
        })
        },
        onError: (error) => {
            console.log("Error in use signup hook ", error)
             toast(error.message, {
              variant: "destructive",
              className: "bg-black text-white",
              description: new Date().toLocaleString(),
              action: {
                label: "Hide",
                onClick: () => console.log("Hide"),
              },
        })
        }
    })

    return { 
        isPending, 
        isSuccess, 
        error, 
        signupMutation 
    }
}