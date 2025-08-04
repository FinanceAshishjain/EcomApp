import { useState } from 'react';
import axios from 'axios'
import toast, {Toaster} from 'react-hot-toast'
import Jumbotron from '../../components/cards/jumbotron'
import { useAuth } from '../../context/auth';
import { useNavigate, useLocation } from 'react-router-dom';


export default function Login() {
  const [email, setEmail]=useState('testA@test.com');
  const [password, setPassword]=useState('password');

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const Location = useLocation();

    const handleSubmit = async(e) => {
      e.preventDefault();
      try{
        const {data} =await axios.post(`/login`,{email,password})
        if(data?.error)
        {
          toast.error(data.error)
        }else{
          localStorage.setItem('auth', JSON.stringify (data));
          setAuth({...auth, token : data.token, user:data.user  })
          toast.success('Login Success')
          navigate(Location.state || `/dashboard/${data?.user?.role===1? "admin": "user"}`)
        }

        console.log(data.error);
    
      }
      catch(err){
        console.log(err)
      }

    }
    return (
      <div >
        <Jumbotron title="Login Page" subtitle="Please login"></Jumbotron>
        
        <div className='container mt-5'>
          <div className='row'>
            <div className='col-md-6 offset-md-3'>
            <form onSubmit={handleSubmit}>

              <input type='email' className='form-control md-4 p-2' placeholder='Input your email' 
              value={email}
              onChange={(e)=>setEmail(e.target.value)}></input>

              <input type='password' className='form-control md-4 p-2' placeholder='Input your password' 
              value={password}
              onChange={(e)=>setPassword(e.target.value)} ></input>
              <button className='btn btn-primary' type='submit'>Submit</button>

              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  

  