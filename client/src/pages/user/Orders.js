import AdminMenu from '../../components/nav/AdminMenu.js'

import { useAuth } from "../../context/auth.js"
import Jumbotron from "../../components/cards/jumbotron.js"
import UserMenu from '../../components/nav/UserMenu.js';

export default function Orders(){

    const [auth, setAuth]= useAuth();

    return (
        <>
            <Jumbotron title={`Hello ${auth?.user?.name}`} subtitle=" Orders Dashboard " ></Jumbotron>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu></UserMenu>
                    </div>
                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-light"> Order Information  </div>
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