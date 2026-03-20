import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useWorkspacePrefrencesModal } from "@/hooks/context/useWorkspacePreferencesModal"
import { TrashIcon } from "lucide-react";

export const WorkspacePrefrencesModal = () => {

    const {initialValue, openPrefrences, setOpenPrefrences} = useWorkspacePrefrencesModal();

    function handleClose () {
        
        setOpenPrefrences(false)
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

                    <button className="flex items-center py-4 px-5 gap-x-2 bg-white rounded-lg " >
                        <TrashIcon size="20" />
                        <p className="text-sm font-semibold" > Delete Workspace </p>
                    </button>

                </div>

            </DialogContent>

    </Dialog>

)
}

