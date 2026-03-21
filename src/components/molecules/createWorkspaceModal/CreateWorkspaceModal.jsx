import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { userCreateWorkspace } from "@/hooks/apis/workspace/userCreateWorkspace";
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal"
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";




export const CreateWorkspaceModal = () => {

    const { openCreateWorkspaceModal,setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();
    const [workspaceName, setWorkspaceName] = useState('');
    const { isPending, error, createWorkspaceMutation } = userCreateWorkspace();
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    function handleClose() {
        setOpenCreateWorkspaceModal(false);
    }

    async function handleFormSubmit(e ) {
        try {
            
            e.preventDefault();
            const data = await createWorkspaceMutation({name: workspaceName});
            queryClient.invalidateQueries('fetchWorkspace')
            console.log(" created workspace ",data);
            navigate(`/workspace/${data?._id}`);

        } catch (error) {
            console.log('Error in craete workspace modal component');
            throw error;
        } finally {
            setWorkspaceName('');
            console.log("open state before", openCreateWorkspaceModal)
            setOpenCreateWorkspaceModal(false) 
            console.log("open state after", openCreateWorkspaceModal)
        }
    }

    

    return <Dialog
        open={openCreateWorkspaceModal}
        onOpenChange={handleClose}
    >

        <DialogContent>

    <DialogHeader>
        <DialogTitle> Create a new workspace </DialogTitle>
    </DialogHeader>

        <form>

            <Input 
                required
                minLength={3}
                placeholder="Enter name for workspace e.g. 'My WorkSapce' "
                onChange={e => setWorkspaceName(e.target.value)}
                disabled={isPending}
            />

            <div className="flex justify-end mt-5 *:" >

                <Button onClick={handleFormSubmit}
                    disabled={isPending}
                >Create</Button>

            </div>

        </form>

        </DialogContent>


    </Dialog>

}