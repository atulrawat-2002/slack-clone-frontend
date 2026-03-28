import { AllExistingWorkspacesModal } from "@/components/atoms/allExistingWorkspaces/AllExistingWorkspacesModal"
import { CreateChannelModal } from "@/components/molecules/createChannelModal/CreateChannelModal"
import { CreateWorkspaceModal } from "@/components/molecules/createWorkspaceModal/CreateWorkspaceModal"
import { WorkspacePrefrencesModal } from "@/components/molecules/workspace/WorkspacePrefrencesModal"

const Modals = () => {
  return (
    <>

      <CreateWorkspaceModal />
      <WorkspacePrefrencesModal />
      <CreateChannelModal />
      <AllExistingWorkspacesModal />
    </>
  )
}

export default Modals