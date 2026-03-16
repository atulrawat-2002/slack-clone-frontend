import { useMutation } from "@tanstack/react-query";
import { signUpRequest } from "@/apis/auth";
import { toast } from "sonner";


export const useSignup = () => {
    const { isPending, isSuccess, error, mutateAsync: signupMutation } = useMutation({
        mutationFn: signUpRequest,
        onSuccess: (data) => {
            console.log(data);
            toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
        },
        onError: (error) => {
            console.log("Error in use signup hook ", error)
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
        signupMutation 
    }
}