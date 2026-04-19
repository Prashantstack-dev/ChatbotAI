

import {useEffect, useState} from "react"


export default function useServerStatus(){
    const[isOnline, setIsOnline]=useState(false);
    const [loading, setLoading] = useState(true);

    const checkServer = async () => {
        //Right before every server request, mark the UI as loading again
        // console.log("Checking server...");
        setLoading(true);
        try{
      const res = await fetch(`${import.meta.env.VITE_API_URL}/health`,{cache: 'no-cache'});
      
      setIsOnline(res.ok)
        } catch {
       setIsOnline(false);
        } finally {
            setLoading(false);
        }
    };
    useEffect(()=>{
        checkServer();
        const interval = setInterval(checkServer, 10000); //fires every 10sec
        return ()=> clearInterval(interval);
    },[])
    return {isOnline,loading};
}