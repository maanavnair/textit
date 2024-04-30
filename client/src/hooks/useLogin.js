import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const {authUser, setAuthUser} = useAuthContext();

  const login = async (username, password) =>{
    setLoading(true);
    try{
        const res = await fetch('https://textit-backend.vercel.app/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if(data.error){
            throw new Error(data.error);
        }
        localStorage.setItem('chat-user', JSON.stringify(data));
        setAuthUser(data);

    }
    catch(err){
        toast.error(err.message);
    }
    finally{
        setLoading(false);
    }
  }
  return { loading, login };
}

export default useLogin