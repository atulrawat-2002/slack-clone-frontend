import CombinedContext from '@/utils/CombinedContext'
import { AuthContexProvider } from './AuthContex'

export const AppContextProvider = CombinedContext(
    AuthContexProvider,
)