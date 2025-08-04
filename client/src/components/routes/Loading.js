import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import loadingGif from "../../images/loading.gif"

export default function Loading({path="login"}){
 const [count, setCount]= useState(3);

 const Navigate=useNavigate();
 const Location = useLocation();

 useEffect(()=>{
    const interval = setInterval(()=>{
        setCount((currentCount)=> -- currentCount)

    },1000)

    count ===0 && Navigate(`/${path}`, {
        state: Location.pathname,
    }) 
    return () => clearInterval(interval)
 },[count])

 return(
    <div className="d-flex justify-content-center align-items-center vh-100">
        <img src={loadingGif}></img>
        Redirecting in {count} seconds</div>
 )
}