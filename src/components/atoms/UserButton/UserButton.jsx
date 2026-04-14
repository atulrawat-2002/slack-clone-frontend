import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from '@/hooks/context/useAuth'
import { toast } from "sonner";
import { LogOutIcon, PencilIcon, RssIcon, SettingsIcon } from 'lucide-react';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCreateWorkspaceModal } from '@/hooks/context/useCreateWorkspaceModal';
import { useAllExistingWorkspacesModal } from '@/hooks/context/useAllExistingWorkspaceModal';
import { Hint } from '../hint/Hint';

const UserButton = () => {

    const { auth, logout } = useAuth();
    const navigate = useNavigate()
    const { setOpenCreateWorkspaceModal} = useCreateWorkspaceModal();
    const { toggleAllExistingWorkspacesModal, setToggleAllExistingWorkspacesModal } = useAllExistingWorkspacesModal()

    async function handleLogout() {
        await logout();
        toast("you have been signed out ", {
          description: new Date().toLocaleString(),
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
        navigate('/auth/signin')
    }

    function openWorkspaceCreateModal() {
        setOpenCreateWorkspaceModal(true);
    }

     useEffect(() => {
      }, [toggleAllExistingWorkspacesModal])

  return (
    <>

    <Hint label="Menu" >
    <DropdownMenu  >
  <DropdownMenuTrigger className="bg-slate-400 rounded-3xl border-2 outline-4 outline-purple-700 border-purple-950" >

    <Avatar className='size-10 hover:opacity-65 transition' >

        <AvatarImage src={auth?.user?.avatar} />
        <AvatarFallback> {auth?.user?.username[0].toUpperCase()} </AvatarFallback>

    </Avatar>

  </DropdownMenuTrigger>
  
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel className="font-bold" >My Account</DropdownMenuLabel>
      <DropdownMenuItem className="cursor-pointer" onClick={handleLogout} >

        <LogOutIcon  className='size-4 mr-2 cursor-pointer' />
        Logout

      </DropdownMenuItem>

      <DropdownMenuItem className="cursor-pointer" >

        <SettingsIcon className='size-4 mr-2 cursor-pointer' />
        Setting

      </DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer" onClick={openWorkspaceCreateModal} >

        <PencilIcon className='size-4 mr-2 cursor-pointer' />
        Create Worksace

      </DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer"  onClick={() => setToggleAllExistingWorkspacesModal(prev => !prev)}>

        <RssIcon className='size-4 mr-2 cursor-pointer'  />
        Join A Worksace

      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem className="cursor-pointer" >Team</DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer" >Subscription</DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>

    </Hint>

    </>
  )
}

export default UserButton