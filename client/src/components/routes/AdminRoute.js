import {useEffect, useState} from 'react';
import { Outlet } from 'react-router-dom';
import {useAuth} from '../../context/auth'
import Loading from './Loading'
import axios from 'axios'


export default function AdminRoute (){
    const [auth,setAuth]=useAuth();

    const[ok, setOk]= useState(false);
 
    useEffect(() => {
        if(auth?.token){
            const admincheck=async ()=>{
                const data =await axios.get(`/admin-check`)
                console.log(data);
                if(data.data.ok) {
                    setOk(true)
                } else {
                    setOk(false)
                }
        
            }
            admincheck();
        }else {
            setOk(false);
        }
    }, [auth?.token] );  
    return ok ? <Outlet/> : <Loading path=""/>  
}