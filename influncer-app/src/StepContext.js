import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import App from './App';
export const multiStepContext=React.createContext();

function StepContext() {
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(null);

  return (
    <div>
       <multiStepContext.Provider value={{
        profilePhotoUrl, setProfilePhotoUrl
      }}>
        <App/>
      </multiStepContext.Provider>
    </div>
  )
}

export default StepContext
