import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useFetchWorkspaceById } from "@/hooks/apis/workspace/useFetchWorkspaceById";
import { useAuth } from "@/hooks/context/useAuth";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { InfoIcon, LucideLoader2, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

export const WorkspaceNavbar = () => {

  const { workspaceId } = useParams();
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const { isFetching, workspace, isSuccess, error } = useFetchWorkspaceById(workspaceId);
  const { setCurrentWorkspace } = useCurrentWorkspace()
  const { logout, auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

    if( !isFetching && !isSuccess && error ){
        console.log('Error fetching workspace', error);
        if(error.status === 403) {
          logout();
          navigate('/auth/signin')
        }
    }

    if(workspace) {

      workspace?.members.forEach((item) => {
        if (item?.memberId?._id === auth?.user?._id) {
          setCurrentUserRole(item?.role);
        }
      })
      setCurrentWorkspace(workspace);
    }

  }, [workspace, setCurrentWorkspace, isSuccess, isFetching, error])

  
  if(isFetching) {
    return <LucideLoader2 className="animate-spin ml-2" />
  }


  return (
    <nav className="flex items-center justify-center h-10 p-1.5  bg-slack-DARK" >
        

        <div className="flex-1 " />

      { currentUserRole &&  <div className="" >

          <span className="text-white text-xl" >
            
           You ({ auth?.user?.username[0].toUpperCase()+auth?.user?.username.slice(1) }) are { currentUserRole  } in 
           
           <span className="" > "{workspace?.name}" </span>

        </span>
        </div>}

        <div className="ml-auto flex-1 flex items-center justify-end" >
          <Avatar className='size-10 hover:opacity-65 transition bg-slate-300' >

            <AvatarImage src={auth?.user?.avatar} />
            <AvatarFallback> {auth?.user?.username[0].toUpperCase()} </AvatarFallback>

        </Avatar>
          </div>

    </nav>
  )
}

