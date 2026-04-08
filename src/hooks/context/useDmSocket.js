import DmSocketContext from "@/context/DmSocketContext";
import { useContext } from "react"

export const useDmSocket = () => {
    return useContext(DmSocketContext);
}