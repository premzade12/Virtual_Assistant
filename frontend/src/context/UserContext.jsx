import React, { createContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

export const userDataContext = createContext();

function UserContext({ children }) {
  const serverUrl = "https://virtual-assistant-backend-3gz3.onrender.com";
  const [userData, setUserData] = useState(null);
  const [frontendImage,setFrontendImage]=useState(null);
  const [backendImage,setBackendImage]=useState(null);
  const [selectedImage,setSelectedImage]= useState(null);

  const handleCurrentUser = async ()=> {
    try {
        const result = await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true});
      setUserData(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error)
    }
  }

  const getGeminiResponse = async (command, assistantName, userName) => {
    try {
      const result = await axios.post(`${serverUrl}/api/user/asktoassistant`,{command,assistantName,userName},{withCredentials:true});
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    handleCurrentUser()
  },[])
  const value = {
    serverUrl,userData, setUserData, backendImage,setBackendImage, frontendImage,setFrontendImage, selectedImage,setSelectedImage, getGeminiResponse
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
