import { useMutation } from "@tanstack/react-query";
import { signUpRequest } from "@/apis/auth";


export const useSignup = () => {
    const { isPending, isSuccess, error, mutate: signupMutation } = useMutation({
        mutationFn: signUpRequest,
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.log("Error in use signup hook ", error)
        }
    })

    return { 
        isPending, 
        isSuccess, 
        error, 
        signupMutation 
    }
}