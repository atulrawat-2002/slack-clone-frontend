import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAddChannelToWorkspace } from "@/hooks/apis/workspace/useAddChannelToWorkspace";
import { useCreateChannelModal } from "@/hooks/context/useCreateChannelModal"
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export const CreateChannelModal = () => {

    const { openCreateChannelModal, setOpenCreateChannelModal } = useCreateChannelModal();

    const [channelName, setChannelName] = useState('');

    const { addChannelToWorkspaceMutation, isSuccess, isPending } = useAddChannelToWorkspace();

    const { currentWorkspace } = useCurrentWorkspace();

    const queryClient = useQueryClient();

    function handleClose() {
        setOpenCreateChannelModal(false)
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        await addChannelToWorkspaceMutation({
            workspaceId: currentWorkspace?._id,
            channelName: channelName
        });

        toast("Channel Added successfully", {
              description: new Date().toLocaleString(),
              action: {
                label: "Hide",
                onClick: () => {},
          },
        })

        queryClient.invalidateQueries({
            queryKey: [`fetWorkspaceById-${currentWorkspace?._id}`]
        });

        handleClose()

    }

  return (
    <Dialog 
        open={openCreateChannelModal}
        onOpenChange={handleClose}
    >

        <DialogContent>
            <DialogHeader>
                <DialogTitle> Create A Channel </DialogTitle>
            </DialogHeader>

            <form action="" onSubmit={handleFormSubmit} >
                <Input 
                    value={channelName}
                    onChange={e => setChannelName(e.target.value)}
                    minLength={3}
                    placeholder='Channel Name e.g. team announcements'
                    required
                />

                <div className="flex justify-end  mt-4" >   
                    <Button type="submit" >
                        Create Channel
                    </Button>
                </div>

            </form>

        </DialogContent>

    </Dialog>
  )
}


