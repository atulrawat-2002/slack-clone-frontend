import { WorkspaceNavbar } from "@/components/organisms/workspace/WorkspaceNavbar"
import { WorkspacePanel } from "@/components/organisms/workspace/WorkspacePanel"
import { WorkspaceSideBar } from "@/components/organisms/workspace/WorkspaceSideBar"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

export const WorksaceLayout = ({ children }) => {
    return (
        <div className="h-[100vh] " >
            <WorkspaceNavbar />
            <div className="flex h-[calc(100vh-2.5rem)]" >

            <WorkspaceSideBar />

            <ResizablePanelGroup orientation="horizontal" autoSaveId='workspace-resize' >

                <ResizablePanel 
                    defaultSize="20"
                    minSize="11"
                    className="bg-slack-MEDIUM"
                >

                    <WorkspacePanel />

                </ResizablePanel>

                <ResizableHandle withHandle />

                <ResizablePanel 
                    minSize="20"
                >

                    { children }

                </ResizablePanel>

            </ResizablePanelGroup>

            
            </div>

        </div>
    )
}