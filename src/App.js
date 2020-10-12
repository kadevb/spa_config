import React from 'react'
import MainComponent from './Components/MainComponent'
import FileProvider from './Components/SharedFileWithContext'

//Render main component
function App() {
  return (
    <>
      <FileProvider>
        <MainComponent />
      </FileProvider>
    </>
  )
}

export default App
