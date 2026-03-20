import WorkspacePrefrencesModalContext from "@/context/WorkspacePreferencesModalContext"
import { useContext } from "react"


export const useWorkspacePrefrencesModal = () => {
    return useContext(WorkspacePrefrencesModalContext)
}