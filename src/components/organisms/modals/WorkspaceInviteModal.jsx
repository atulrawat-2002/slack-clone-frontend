import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useResetJoinCode } from "@/hooks/apis/workspace/useResetJoinCode";
import { CopyIcon, RefreshCcwIcon } from "lucide-react"
import { toast } from "sonner";

export const WorkspaceInviteModal = ({ openInviteModal, setOpenInviteModal, workspaceName, joinCode, workspaceId }) => {

    const { resetJoinCodeMutation, isPending, isSuccess} = useResetJoinCode(workspaceId);

    async function handleCopy() {
        const iniviteLink = `${joinCode}`;
        await navigator.clipboard.writeText(iniviteLink);
        toast("Link Copied", {
              description: new Date().toLocaleString(),
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })
    }

    async function handleResetCode() {
        try {
            await resetJoinCodeMutation();
        toast("Join code reset", {
              description: new Date().toLocaleString(),
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })
        } catch (error) {
            console.log('error in workspace invite modal while reseting join code', error.message)
        }
    }

  return (
    <Dialog open={openInviteModal} onOpenChange={setOpenInviteModal} >

        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                     Invite People to {workspaceName}
                </DialogTitle>
                <DialogDescription className="text-slate-500" >
                    Use The Code Shown Below to Invite the People
                </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center gap-y-4 justify-center ">
                <p className="font-bold text-4xl uppercase " >
                     { joinCode }
                </p>
                <Button variant="ghost" size="sm" onClick={handleCopy} >
                    Copy Code
                    <CopyIcon  className="size-4 ml-2" />
                </Button>

                <a 
                href={`/workspace/join/${workspaceId}`} 
                target="_atul"
                rel="noreferrer"
                className="text-blue-500"
                >
                    Redirect to join page
                </a>

            </div>

            <div className="flex items-center w-full justify-center ">
                <Button variant="outline" onClick={handleResetCode} >
                    Reset Join Code
                    <RefreshCcwIcon  className="size-4 ml-2" />
                </Button>
            </div>

        </DialogContent>

    </Dialog>
  )
}

