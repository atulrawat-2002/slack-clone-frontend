import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useDeleteWorkspace } from "@/hooks/apis/workspace/useDeleteWorkspace";
import { useWorkspacePrefrencesModal } from "@/hooks/context/useWorkspacePreferencesModal"
import { useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const WorkspacePrefrencesModal = () => {

    const {initialValue, openPrefrences, setOpenPrefrences, workspace} = useWorkspacePrefrencesModal();

    const { deleteWorkspaceMutation } = useDeleteWorkspace(workspace?._id);

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    function handleClose () {

        setOpenPrefrences(false)
    }

    async function handleDelete() {
        try {
            await deleteWorkspaceMutation();
            navigate('/home')
            queryClient.invalidateQueries('fetchWorkspace');
            setOpenPrefrences(false); 
            toast("Deleted workspace successfully", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
        } catch (error) {
            console.log('Error in handle delete workspace function', error)
            toast("Error while deleting workspace ", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
        }
    }

  return (

    <Dialog open={openPrefrences} onOpenChange={handleClose} >

            <DialogContent className="bg-gray-50 p-0 overflow-hidden" >
                <DialogHeader className="p-4 border-b bg-white" >
                    <DialogTitle>
                        { initialValue }
                    </DialogTitle>
                </DialogHeader>

                <div className="px-4 pb-4 flex flex-col gap-y-2 ">

                    <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50" > 
                        
                        <div className="flex items-center justify-between">
                           <p className="font-semibold text-sm" >
                             Workspace Name
                           </p>
                           <p className="text-sm font-semibold hover:underline">
                            Edit
                           </p>
                        </div>

                        <p className="text-sm" > {initialValue} </p>
                        
                    </div>

                    <button className="flex items-center py-4 px-5 gap-x-2 bg-white rounded-lg " onClick={handleDelete} >
                        <TrashIcon size="20" />
                        <p className="text-sm font-semibold" > Delete Workspace </p>
                    </button>

                </div>

            </DialogContent>

    </Dialog>

)
}

