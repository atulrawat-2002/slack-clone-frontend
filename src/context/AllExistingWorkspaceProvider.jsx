import { createContext, useState } from "react";

const AllExistingWorkspacesContext = createContext();

export const AllExistingWorkspacesProvider = ({children}) => {

    const [toggleAllExistingWorkspacesModal, setToggleAllExistingWorkspacesModal] = useState(false);

    return <AllExistingWorkspacesContext.Provider value={{toggleAllExistingWorkspacesModal, setToggleAllExistingWorkspacesModal}} >
        {children}
    </AllExistingWorkspacesContext.Provider>
}

export default AllExistingWorkspacesContext;