import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { userGetAllExistingWorkspaces } from '@/hooks/apis/workspace/userGetAllExistingWorkspaces'
import { useAllExistingWorkspacesModal } from '@/hooks/context/useAllExistingWorkspaceModal'
import { useAuth } from '@/hooks/context/useAuth'
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace'
import { useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AllExistingWorkspacesModal = () => {

    const {toggleAllExistingWorkspacesModal, setToggleAllExistingWorkspacesModal} = useAllExistingWorkspacesModal();
    const queryClient = useQueryClient();

    const { isFetching, isError, allExistingWorkspaces, isSuccess, getAllworkspaceFetch } = userGetAllExistingWorkspaces();
    const { auth } = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        // queryClient.invalidateQueries('allExistingWorkspaces');
        if(toggleAllExistingWorkspacesModal) getAllworkspaceFetch();
    }, [toggleAllExistingWorkspacesModal])

  return (
    <>
        <Dialog open={toggleAllExistingWorkspacesModal} onOpenChange={setToggleAllExistingWorkspacesModal}
            className=' z-20 relative '
            
        >

            <DialogContent className="max-h-[70vh] flex flex-col ">

    {/* Fixed Header */}
    <DialogHeader className="shrink-0">
        <p className="font-bold text-xl text-center">
            Current Workspaces
        </p>
    </DialogHeader>

    {/* Scrollable Content */}
    <div className="flex-1 overflow-y-auto mt-2 space-y-2">
        {
            (isSuccess && allExistingWorkspaces) &&
            allExistingWorkspaces.map((item) => (
                <div
                    key={item?._id}
                    className='bg-[rgb(153,62,156)] text-white p-1 rounded-md font-semibold flex justify-between items-center'
                >
                    <span className='flex-1 text-center truncate p-1'>
                        {item?.name}
                    </span>

                    <p className='flex-1 text-center text-[rgb(53,1,54)] p-2'>
                        {
                            item?.members?.find(
                                member => member?.memberId === auth?.user?._id
                            )?.role
                        }
                    </p>

                    {
                        item?.members?.find(
                            member => member?.memberId === auth?.user?._id
                        )
                            ? (
                                <p className='flex-1 text-center p-2 font-semibold text-[rgb(53,1,54)]'>
                                    Joined
                                </p>
                            )
                            : (
                                <Button
                                    className="flex-1 bg-[rgb(89,22,90)]"
                                    onClick={() => {
                                        setToggleAllExistingWorkspacesModal(false);
                                        navigate(`/workspace/join/${item?._id}`);
                                    }}
                                >
                                    Join
                                </Button>
                            )
                    }
                </div>
            ))
        }
    </div>

</DialogContent>

        </Dialog>
    </>
  )
}

