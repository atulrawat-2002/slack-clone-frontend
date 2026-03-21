import { createContext, useState } from "react";

const WorkspacePrefrencesModalContext = createContext();


export const WorkspacePrefrencesModalContextProvider = ({ children }) => {

    const [openPrefrences, setOpenPrefrences] = useState(false);
    const [initialValue, setInitialValue] = useState('Edit workspace');
    const [workspace, setWorkspace] = useState(null);

    return (
        <WorkspacePrefrencesModalContext.Provider value={{openPrefrences, setOpenPrefrences, initialValue, setInitialValue, workspace, setWorkspace}} >

            {children}

        </WorkspacePrefrencesModalContext.Provider>
    )

}


export default WorkspacePrefrencesModalContext;