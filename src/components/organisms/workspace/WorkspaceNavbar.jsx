import { Button } from "@/components/ui/button";
import { useFetchWorkspaceById } from "@/hooks/apis/workspace/useFetchWorkspaceById";
import { useAuth } from "@/hooks/context/useAuth";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { InfoIcon, LucideLoader2, SearchIcon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"

export const WorkspaceNavbar = () => {

  const { workspaceId } = useParams();
  const { isFetching, workspace, isSuccess, error } = useFetchWorkspaceById(workspaceId);
  const { setCurrentWorkspace } = useCurrentWorkspace()
  const { logout } = useAuth();
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
      setCurrentWorkspace(workspace);
    }
  }, [workspace, setCurrentWorkspace, isSuccess, isFetching, error])

  
  if(isFetching) {
    return <LucideLoader2 className="animate-spin ml-2" />
  }


  return (
    <nav className="flex items-center justify-center h-10 p-1.5  bg-slack-DARK" >
        

        <div className="flex-1" />
      <div >
        <Button size="sm" className="bg-gray-400/25 hover:bg-gray-950/15 justify-start h-7 px-2" >

          <SearchIcon className="text-white mr-2 size-5" />
          <span className="text-white text-xs" >
            
          Search {workspace?.name || 'Workspace'  }

        </span>
        </Button>
        </div>

        <div className="ml-auto flex-1 flex items-center justify-end" >
          <Button
            variant="tranparent"
            size="iconSm"
          >
            <InfoIcon className="size-5 text-white" />
          </Button>
          </div>

    </nav>
  )
}

