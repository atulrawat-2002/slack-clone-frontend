import AllExistingWorkspacesContext from "@/context/AllExistingWorkspaceProvider";
import { useContext } from "react"

export const useAllExistingWorkspacesModal = () => {
    return useContext(AllExistingWorkspacesContext)
}