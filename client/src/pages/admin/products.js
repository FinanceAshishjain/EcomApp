import Category from '../admin/Category.js'
import Product  from  '../admin/Product.js'

import AdminMenu from '../../components/nav/AdminMenu.js'
import { useState, useEffect } from 'react'
import { useAuth } from "../../context/auth"
import Jumbotron from "../../components/cards/jumbotron"

export default function Products(){

    const [auth, setAuth]= useAuth();

    return (
        <>
            <Jumbotron title={`Hello ${auth?.user?.name}`} subtitle=" Admin Dashboard " ></Jumbotron>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu></AdminMenu>
                    </div>
                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-light"> Products Information  </div>
                        <ul className="list-group  ">
                            <li className='list-group-item' > {auth?.user?.name} </li>
                            <li className='list-group-item' > {auth?.user?.email} </li>
                            <li className='list-group-item' > {auth?.user?.role} </li>
                        </ul>
                    </div>
                </div>
            </div> 
        </>


    )
    }