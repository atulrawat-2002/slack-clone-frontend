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

const UserButton = () => {

    const { auth, logout } = useAuth();
    const navigate = useNavigate()
    const { setOpenCreateWorkspaceModal} = useCreateWorkspaceModal();
    const { toggleAllExistingWorkspacesModal, setToggleAllExistingWorkspacesModal } = useAllExistingWorkspacesModal()

    async function handleLogout() {
        await logout();
        toast("you have been signed out ", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
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
        console.log("AllExistingWorkspacesModal open:", toggleAllExistingWorkspacesModal)
      }, [toggleAllExistingWorkspacesModal])

  return (
    <>

    <DropdownMenu>
  <DropdownMenuTrigger >

    <Avatar className='size-10 hover:opacity-65 transition' >

        <AvatarImage src={auth?.user?.avatar} />
        <AvatarFallback> {auth?.user?.username[0].toUpperCase()} </AvatarFallback>

    </Avatar>

  </DropdownMenuTrigger>
  
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuItem onClick={handleLogout} >

        <LogOutIcon  className='size-4 mr-2 cursor-pointer' />
        Logout

      </DropdownMenuItem>

      <DropdownMenuItem>

        <SettingsIcon className='size-4 mr-2 cursor-pointer' />
        Setting

      </DropdownMenuItem>
      <DropdownMenuItem onClick={openWorkspaceCreateModal} >

        <PencilIcon className='size-4 mr-2 cursor-pointer' />
        Create Worksace

      </DropdownMenuItem>
      <DropdownMenuItem  onClick={() => setToggleAllExistingWorkspacesModal(prev => !prev)}>

        <RssIcon className='size-4 mr-2 cursor-pointer'  />
        Join A Worksace

      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>Team</DropdownMenuItem>
      <DropdownMenuItem>Subscription</DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
    </>
  )
}

export default UserButton