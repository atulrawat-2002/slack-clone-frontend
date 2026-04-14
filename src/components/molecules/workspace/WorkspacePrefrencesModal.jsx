import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { useDeleteWorkspace } from "@/hooks/apis/workspace/useDeleteWorkspace";
import { useUpdateWorkspace } from "@/hooks/apis/workspace/useUpdateWorkspace";
import { useWorkspacePrefrencesModal } from "@/hooks/context/useWorkspacePreferencesModal"
import { useConfirm } from "@/hooks/useConfirm";
import { useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const WorkspacePrefrencesModal = () => {

    const {initialValue, openPrefrences, setOpenPrefrences, workspace} = useWorkspacePrefrencesModal();

    const [editOpen, setEditOpen] = useState(false);
    const [renameValue, setRenameValue] = useState(workspace?.name);
    
    const { deleteWorkspaceMutation } = useDeleteWorkspace(workspace?._id);
    const {isPending, updateWorkspaceMutation} = useUpdateWorkspace(workspace?._id);
    const { ConfirmDialog, confirmation } = useConfirm({
        title: 'Do you want to delete the workspace?',
        description: 'This action cannot be undone'
    })

    const { ConfirmDialog: UpdateConfirmDialog, confirmation: updateConfirmation } = useConfirm({ 
        title: 'Do you want to update the workspace?',
        description: 'This action cannot be undone'
     })

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    function handleClose () {

        setOpenPrefrences(false)
    }

    async function handleDelete() {
        try {
            const ok = await confirmation();
            if(!ok) {
                return;
            }
            await deleteWorkspaceMutation();
            navigate('/home')
            queryClient.invalidateQueries('fetchWorkspace');
            setOpenPrefrences(false); 
            toast("Deleted workspace successfully", {
                description: new Date().toLocaleString(),
                action: {
                    label: "Undo",
                onClick: () => console.log("Undo"),
          },
        }) 
        } catch (error) {
            console.log('Error in handle delete workspace function', error)
            toast("Error while deleting workspace ", {
          description: new Date().toLocaleString(),
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
        }
    }

    async function handleFormSubmit(e ) {
        e.preventDefault()
        try {

            const ok = await updateConfirmation();
            await updateWorkspaceMutation(renameValue);
            queryClient.invalidateQueries(`fetWorkspaceById-${workspace?._id}`);
            setOpenPrefrences(false);
            toast("Workspace updated successfully", {
                description: new Date().toLocaleString(),
                action: {
                    label: "undo",
                    onClick: () => console.log('Undo')
                }
            })
        } catch (error) {
            console.log('Error in handle form submit of edit workspace function', error)
            toast("Error while updating workspace ", {
          description: new Date().toLocaleString(),
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
        }
    }

    useEffect(() => {

    })

  return (

    <>
    <ConfirmDialog />
    <UpdateConfirmDialog />
    <Dialog open={openPrefrences} onOpenChange={handleClose} >

            <DialogContent className="bg-gray-50 p-0 overflow-hidden" >
                <DialogHeader className="p-4 border-b bg-white" >
                    <DialogTitle>
                        { initialValue }
                    </DialogTitle>
                </DialogHeader>

                <div className="px-4 pb-4 flex flex-col gap-y-2 ">

                    <Dialog open={editOpen} onOpenChange={setEditOpen} >

                        <DialogTrigger>
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
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Rename Workspace
                                </DialogTitle>
                            </DialogHeader>

                            <form className="space-y-4" onSubmit={handleFormSubmit} >
                                <Input 
                                    value={renameValue}
                                    onChange={e => setRenameValue(e.target.value)}
                                    required
                                    autoFocus
                                    minLength={3}
                                    maxLength={50}
                                    placeholder='Workspace name e.g. Design Team'
                                    disabled={isPending}
                                />

                                <DialogFooter>
                                    <DialogClose>
                                    <Button variant="outline" disabled={isPending} >
                                        Cancel
                                    </Button>
                                    </DialogClose>
                                    <Button type='submit' disabled={isPending} >
                                        Save
                                    </Button>
                                </DialogFooter>
                            </form>

                        </DialogContent>

                    </Dialog>

                    <button className="flex items-center py-4 px-5 gap-x-2 bg-white rounded-lg " onClick={handleDelete} >
                        <TrashIcon size="20" />
                        <p className="text-sm font-semibold" > Delete Workspace </p>
                    </button>

                </div>

            </DialogContent>

    </Dialog>
    </>
)
}

