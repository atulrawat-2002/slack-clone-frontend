import CombinedContext from '@/utils/CombinedContext'
import { AuthContexProvider } from './AuthContex'
import { CreateWorkspaceProvider } from './CreateWorkspaceContext'
import { WorkspacePrefrencesModalContextProvider } from './WorkspacePreferencesModalContext'

export const AppContextProvider = CombinedContext(
    AuthContexProvider,
    CreateWorkspaceProvider,
    WorkspacePrefrencesModalContextProvider
)