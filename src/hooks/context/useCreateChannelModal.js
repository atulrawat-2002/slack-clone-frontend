import createChannelContext from "@/context/CreateChannleContext"
import { useContext } from "react"

export const useCreateChannelModal = () => {

    return useContext(createChannelContext);

}