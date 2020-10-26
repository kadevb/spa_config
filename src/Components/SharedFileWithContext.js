import React, { createContext } from 'react'

// export const SharedFileWithContext = createContext()

// export const FileProvider = (props) => {
//   const [dataCsv, setDataCsv] = useState([])

//   return (
//     <SharedFileWithContext.Provider value={{ dataCsv, setDataCsv }}>
//       {props.children}
//     </SharedFileWithContext.Provider>
//   )
// }

const sPAContext = createContext()

export default sPAContext
