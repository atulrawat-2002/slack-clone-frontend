import { createContext, useState } from "react"

const createChannelContext = createContext()

export const CreateChannelContextProvider = ( { children } ) => {

    const [openCreateChannelModal, setOpenCreateChannelModal] = useState(false);

    return (
        <createChannelContext.Provider value={{ openCreateChannelModal, setOpenCreateChannelModal }} >

            {children}

        </createChannelContext.Provider>
    )

}


export default createChannelContext;