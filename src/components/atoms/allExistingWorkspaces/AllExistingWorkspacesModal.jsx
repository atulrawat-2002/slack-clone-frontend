import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { userGetAllExistingWorkspaces } from '@/hooks/apis/workspace/userGetAllExistingWorkspaces'
import { useAllExistingWorkspacesModal } from '@/hooks/context/useAllExistingWorkspaceModal'
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace'
import { useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const AllExistingWorkspacesModal = () => {

    const {toggleAllExistingWorkspacesModal, setToggleAllExistingWorkspacesModal} = useAllExistingWorkspacesModal();
    const queryClient = useQueryClient();

    const { isFetching, isError, allExistingWorkspaces, isSuccess, getAllworkspaceFetch } = userGetAllExistingWorkspaces();


    const navigate = useNavigate()

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
                    <p className=' font-bold text-xl text-center' >  Current Workspaces </p>
                </DialogHeader>



                {
                    (isSuccess && allExistingWorkspaces) && allExistingWorkspaces?.map((item) => {
                        return <div 
                        key={item?._id} 
                        className='bg-slate-300 p-1 rounded-md font-semibold flex justify-between items-center'
                        > <span> {item?.name} </span> 

                            <Button
                                onClick={() => {
                                    setToggleAllExistingWorkspacesModal(false);
                                    navigate(`/workspace/join/${item?._id}`)
                                }}
                            > Join </Button>

                         </div>
                    })
                }

            </DialogContent>

        </Dialog>
    </>
  )
}

