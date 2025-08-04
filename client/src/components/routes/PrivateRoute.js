import {useEffect, useState} from 'react';
import { Outlet } from 'react-router-dom';
import {useAuth} from '../../context/auth'
import Loading from './Loading'
import axios from 'axios'


export default function PrivateRoute (){
    const [auth,setAuth]=useAuth();

    const[ok, setOk]= useState(false);

    // useEffect(()=>{
  
    // }, [auth?.token])

    useEffect(() => {
        if(auth?.token){
            const authcheck=async ()=>{
                const data =await axios.get(`/auth-check`)
                console.log(data);
                if(data.data.ok) {
                    setOk(true)
                } else {
                    setOk(false)
                }
        
            }
            authcheck();
        }else {
            setOk(false);
        }
    }, [auth?.token] );  
    return ok ? <Outlet/> : <Loading/>  
}