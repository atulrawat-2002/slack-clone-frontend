import { WorkspaceNavbar } from "@/components/organisms/workspace/WorkspaceNavbar"
import { WorkspacePanel } from "@/components/organisms/workspace/WorkspacePanel"
import { WorkspaceSideBar } from "@/components/organisms/workspace/WorkspaceSideBar"
import { Badge } from "@/components/ui/badge"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

export const WorksaceLayout = ({ children }) => {

    return (
        <div className="h-[100vh] " >
            <WorkspaceNavbar />
            <div className="flex h-[calc(100vh-2.5rem)]" >

            <WorkspaceSideBar />

            <ResizablePanelGroup orientation="horizontal" autosaveid='workspace-resize' >

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
                    
                    { children ||
                        <div className="flex w-full h-full flex-wrap justify-center items-center ">
                            <Badge className="font-semibold rounded-md text-lg p-3" variant="secondary">Select a channel and start messaging</Badge>
                        </div>
                    }


                </ResizablePanel>

            </ResizablePanelGroup>

            
            </div>

        </div>
    )
}