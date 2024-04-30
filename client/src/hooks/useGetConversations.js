import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';

const useGetConversations = () => {
    const [loading, setLoading] = useState(false); 
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try{
                const res = await fetch('https://textit-backend.vercel.app/api/users', {
                    credentials: 'include'
                });
                const data = await res.json();
                if(data.error){
                    throw new Error(data.error);
                }
                setConversations(data);
            }
            catch(err){
                toast.error(err.message);
            }
            finally{
                setLoading(false);  
            }
        }

        getConversations();
    }, [])

    return { loading, conversations };
}

export default useGetConversations