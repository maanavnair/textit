import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const {authUser, setAuthUser} = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try{
        const res = await fetch('http://localhost:3000/api/auth/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })

        const data = await res.json();
        if(data.error){
            throw new Error(data.error);
        }

        localStorage.removeItem('chat-user');
        setAuthUser(null);
    }
    catch(err){
        toast.error(err.message);
    }
    finally{
        setLoading(false);
    }
  }

  return { loading, logout };
}

export default useLogout