import { Button } from '@/components/ui/button';
import { useJoinWorkspace } from '@/hooks/apis/workspace/useJoinWorkspace';
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as VerificationInputModule from "react-verification-input";
import { toast } from 'sonner';

const VerificationInput =
  VerificationInputModule.default?.default || VerificationInputModule.default;

export const JoinPage = () => {

    const { workspaceId }  = useParams();
    const navigate = useNavigate();
    const { joinWorkspceMutation, isPending, isSuccess, error } = useJoinWorkspace(workspaceId);

    async function hanldeMemberToWorkspace(joinCode) {
        console.log("adding member to workspace", joinCode);
        try {
            await joinWorkspceMutation(joinCode); 
            toast(`You have been added to ${workspaceId} workspace successfully`, {
              description: "Sunday, December 03, 2023 at 9:00 AM",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo")     
              },
            })
            navigate(`/workspace/${workspaceId}`)
        } catch (error) {
            console.log('Error in join page adding member ot workspace', error.message);
        }
    }

    return (
        <div className='h-[100vh] flex flex-col gap-y-8 items-center justify-center p-8 bg-white rounded-lg shadow-sm'>
            
            <div className="flex flex-col gap-y-4 items-center justify-center">
                
                <div className='flex flex-col gap-y-2 items-center justify-center' >
                    <h1 className='font-bold text-3xl'>Join Page</h1>
                    <p>Enter the code you received to join workspace</p>
                </div>

            <VerificationInput 
            onComplete={hanldeMemberToWorkspace}
            length={6}
            classNames={{
                container: 'flex gap-x-2',
                character: 'h-auto  rounded-md border border-gray-3oo flex items-center justify-center text-lg font-medium  ',
                characterInactive: 'bg-slate-300 ',
                characterFilled: 'bg-white text-black ',
                characterSelected: 'bg-white text-black'

            }}
            autoFocus
             />
            </div>

            <div className='felx gap-x-4' >

                <Button variant='outline' size='lg' >
                    <Link to={`/workspace/${workspaceId}`} > 
                        Back to the workspace
                    </Link>
                </Button>

            </div>

        </div>
    )
}