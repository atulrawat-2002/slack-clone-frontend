import { useMutation } from "@tanstack/react-query";
import { signInRequest } from "@/apis/auth";
import { toast } from "sonner";


export const useSignin = () => {
    const { isPending, isSuccess, error, mutateAsync: signinMutation } = useMutation({
        mutationFn: signInRequest,
        onSuccess: (data) => {
            console.log(data);
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