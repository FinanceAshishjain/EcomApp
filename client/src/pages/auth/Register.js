import { useState } from 'react';
import axios from 'axios'
import toast, {Toaster} from 'react-hot-toast'
import Jumbotron from '../../components/cards/jumbotron'
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';


export default function Register() {
    const [name, setName]=useState('test');
    const [password, setPassword]=useState('test@test.com');
    const [email, setEmail]=useState('test1234');
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
      e.preventDefault();
      try{
        const {data} =await axios.post(`/register`,{name,email,password})
        if(data?.error)
        {
          toast.error(data.error)
        }else{
          localStorage.setItem('auth', JSON.stringify (data));
          setAuth({...auth, token : data.token, user:data.user  })
          toast.success('Registration Success')
          navigate('/dashboard')
        }

        console.log(data.error);
    
      }
      catch(err){
        console.log(err)
      }

    }
    return (
      <div >
        <Jumbotron title="New User Registration" subtitle="Please register"></Jumbotron>
        
        <div className='container mt-5'>
          <div className='row'>
            <div className='col-md-6 offset-md-3'>
            <form onSubmit={handleSubmit}>
              <input type='text' className='form-control md-4 p-2' placeholder='Input your name' 
              value={name}
              onChange={(e)=>setName(e.target.value)} autoFocus></input>

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
  

  