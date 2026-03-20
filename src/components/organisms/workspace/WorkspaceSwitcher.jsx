import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { userFetchWorkspace } from '@/hooks/apis/workspace/useFetchWorksace';
import { useFetchWorkspaceById } from '@/hooks/apis/workspace/useFetchWorkspaceById';
import { Loader } from 'lucide-react';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const WorkspaceSwitcher = () => {

    const navigate = useNavigate();

    const { workspaceId } = useParams();

    const {isFetching, workspace} = useFetchWorkspaceById(workspaceId);
    const {workSpaces, isFetching: isFetchingWorkspaces} = userFetchWorkspace();

    function handleWorkspaceSwitch(workspaceId) {
        navigate(`/workspace/${workspaceId}`)
    }

  return (
    <DropdownMenu>

    <DropdownMenuTrigger>

        <Button className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 font-semibold text-slate-800 text-xl" >

            {
                isFetching ? ( <Loader className='size-5 animate-spin' /> ) : workspace?.name.charAt(0).toUpperCase()
            }

        </Button>

    </DropdownMenuTrigger>

    <DropdownMenuContent>

            <DropdownMenuItem className="cursor-pointer flex-col justify-start items-start capitalize" >

                {workspace?.name}
                <span className='text-xs text-gray-500' > (Active Workspace) </span>

            </DropdownMenuItem>

            {
                isFetchingWorkspaces ? ( <Loader className='size-5 animate-spin' /> ) : (

                    workSpaces.map((workspace) => {
                        if(workspace?._id === workspaceId) return;
                        return <DropdownMenuItem className="cursor-pointer flex-col justify-start items-start capitalize"  key={workspace?._id} onClick={() => handleWorkspaceSwitch(workspace?._id)} >
                            <p className=' truncate ' > {workspace?.name} </p>
                        </DropdownMenuItem>
                    })

                )

            }

    </DropdownMenuContent>

    </DropdownMenu>
  )
}

