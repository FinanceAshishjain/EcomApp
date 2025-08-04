import {NavLink} from 'react-router-dom'
import {useAuth} from '../../context/auth'
import { useNavigate } from 'react-router-dom';

export default function Menu(){
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const logout = () =>{
    setAuth({...auth,user:null, token:''});
    localStorage.removeItem("auth");
    navigate("/login");

  }
return (
  <>
    <ul className="nav d-flex justify-content-between shadow-sm mb-2">
      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/">HOME</NavLink>
      </li>
  {/* <li className="nav-item">
    <NavLink className="nav-link" aria-current="page" to="/dashboard/secret">Secret</NavLink>
  </li> */}

  { !auth?.user ? (
    <>
      <li className="nav-item">
      <NavLink className="nav-link" to="/Login">LOGIN</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="/Register">REGISTER</NavLink>
    </li>
  </>
  ) : (
    <div className='dropdown'>
        <a  className="nav-link pointer dropdown-toggle" data-bs-toggle="dropdown" >{auth?.user?.name}</a>
        <ul className='dropdown-menu'>
          <li className="nav-item ">
            <NavLink className="nav-link" to={`/dashboard/${auth?.user?.role===1? 'admin': 'user'}`}>Dashboard</NavLink>
          </li>
          <li className="nav-item pointer ">
            <a  onClick={logout} className="nav-link" >Logout</a>
          </li>
      </ul>
    </div>
  ) 
}
  
    </ul>
  </>
)
}