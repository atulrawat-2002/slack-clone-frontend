import CombinedContext from '@/utils/CombinedContext'
import { AuthContexProvider } from './AuthContex'
import { CreateWorkspaceProvider } from './CreateWorkspaceContext'

export const AppContextProvider = CombinedContext(
    AuthContexProvider,
    CreateWorkspaceProvider
)