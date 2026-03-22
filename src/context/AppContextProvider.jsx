import CombinedContext from '@/utils/CombinedContext'
import { AuthContexProvider } from './AuthContex'
import { CreateWorkspaceProvider } from './CreateWorkspaceContext'
import { WorkspacePrefrencesModalContextProvider } from './WorkspacePreferencesModalContext'
import { CreateChannelContextProvider } from './CreateChannleContext'
import { WorkspaceContextProvider } from './WorkspaceContext'

export const AppContextProvider = CombinedContext(
    AuthContexProvider,
    CreateWorkspaceProvider,
    WorkspacePrefrencesModalContextProvider,
    CreateChannelContextProvider,
    WorkspaceContextProvider
)