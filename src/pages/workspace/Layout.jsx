import { WorkspaceSideBar } from "@/components/organisms/workspace/WorkspaceSideBar"

export const WorksaceLayout = ({ children }) => {
    return (
        <div className="h-[100vh] " >

            <div className="flex h-full" >

            <WorkspaceSideBar />
            { children }
            </div>

        </div>
    )
}