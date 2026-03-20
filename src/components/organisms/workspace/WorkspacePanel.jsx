import { WorkspacePanelHeader } from '@/components/molecules/workspace/WorkspacePanelHeader';
import { useFetchWorkspaceById } from '@/hooks/apis/workspace/useFetchWorkspaceById';
import { AlertTriangleIcon, Loader } from 'lucide-react';
import React from 'react'
import { useParams } from 'react-router-dom'

export const WorkspacePanel = () => {

    const { workspaceId } = useParams();

    const {isFetching, workspace, isSuccess} = useFetchWorkspaceById(workspaceId);

    if(isFetching) {
        return <div className='flex flex-col gap-y-2 h-full items-center justify-center text-white' > 
            <Loader className='animate-spin size-6 text-white' />
        </div>
    }

    if(!isSuccess) {
        return <div className='flex flex-col gap-y-2 h-full items-center justify-center text-white' >
            <AlertTriangleIcon className='size-6 text-white' />
            SomeThing went wrong!
        </div>
    }

  return (
    <div className='flex flex-col h-full bg-slack-MEDIUM' >

        <WorkspacePanelHeader workspace={workspace} />

    </div>
  )
}

