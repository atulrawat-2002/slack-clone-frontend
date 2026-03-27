import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { userGetAllExistingWorkspaces } from '@/hooks/apis/workspace/userGetAllExistingWorkspaces'
import { useAllExistingWorkspacesModal } from '@/hooks/context/useAllExistingWorkspaceModal'
import { useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'

export const AllExistingWorkspacesModal = () => {

    const {toggleAllExistingWorkspacesModal, setToggleAllExistingWorkspacesModal} = useAllExistingWorkspacesModal();
    const queryClient = useQueryClient();

    const { isFetching, isError, allExistingWorkspaces, isSuccess, getAllworkspaceFetch } = userGetAllExistingWorkspaces();

    useEffect(() => {

        if(isFetching) return;
        
        console.log(typeof allExistingWorkspaces, allExistingWorkspaces)

    }, [toggleAllExistingWorkspacesModal])

    useEffect(() => {
        // queryClient.invalidateQueries('allExistingWorkspaces');
        if(toggleAllExistingWorkspacesModal) getAllworkspaceFetch();
    }, [toggleAllExistingWorkspacesModal])

  return (
    <>
        <Dialog open={toggleAllExistingWorkspacesModal} onOpenChange={setToggleAllExistingWorkspacesModal}
            classname=' z-20 relative'
        >

            <DialogContent>

                <DialogHeader>
                    LIst of workspaces
                </DialogHeader>

                {
                    (isSuccess && allExistingWorkspaces) && allExistingWorkspaces?.map((item) => {
                        return <div key={item?._id} > {item?.name} </div>
                    })
                }

            </DialogContent>

        </Dialog>
    </>
  )
}

