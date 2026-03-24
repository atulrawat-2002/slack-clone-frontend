import CombinedContext from '@/utils/CombinedContext'
import { AuthContexProvider } from './AuthContex'
import { CreateWorkspaceProvider } from './CreateWorkspaceContext'
import { WorkspacePrefrencesModalContextProvider } from './WorkspacePreferencesModalContext'
import { CreateChannelContextProvider } from './CreateChannleContext'
import { WorkspaceContextProvider } from './WorkspaceContext'
import { SocketContexProvider } from './SocketContext'
import { ChannelMessagesProvider } from './ChannelMessages'

export const AppContextProvider = CombinedContext(
    ChannelMessagesProvider,
    SocketContexProvider,
    AuthContexProvider,
    CreateWorkspaceProvider,
    WorkspacePrefrencesModalContextProvider,
    CreateChannelContextProvider,
    WorkspaceContextProvider
)