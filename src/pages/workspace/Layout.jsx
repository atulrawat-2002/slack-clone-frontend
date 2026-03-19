import { WorkspaceNavbar } from "@/components/organisms/workspace/WorkspaceNavbar"
import { WorkspaceSideBar } from "@/components/organisms/workspace/WorkspaceSideBar"

export const WorksaceLayout = ({ children }) => {
    return (
        <div className="h-[100vh] " >
            <WorkspaceNavbar />
            <div className="flex h-[calc(100vh-2.5rem)]" >

            <WorkspaceSideBar />
            { children }
            </div>

        </div>
    )
}