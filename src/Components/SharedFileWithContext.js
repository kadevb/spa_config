import React, { useState, createContext} from 'react';

export const SharedFileWithContext= createContext();

const FileProvider = (props) => {
    const [recivedFile, setRecieving] = useState();
    
    return (
        <SharedFileWithContext.Provider value={{recivedFile, setRecieving}}>
            {props.children}
        </SharedFileWithContext.Provider>
    )
} 

export default FileProvider;