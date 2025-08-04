import AdminMenu from '../../components/nav/AdminMenu.js'
import { useState, useEffect } from 'react';
import { useAuth } from "../../context/auth"
import Jumbotron from "../../components/cards/jumbotron"
import axios from 'axios';
import { Select } from 'antd'; 
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

 const {Option} = Select;
export default function Product(){

    const [auth, setAuth]= useAuth();
    const [categories, setCategories] = useState([])
    const[photo,setPhoto]=useState("");
    const[name,setName]=useState("");
    const[description,setDescription]=useState("");
    const[price,setPrice]=useState("");
    const[category,setCategory]=useState("");
    const[shipping,setShipping]=useState("");
    const[quantity,setQuantity]=useState("");
    const navigate = useNavigate();

    const loadCategories= async ()=> {
        try{
            const {data} = await  axios.get('/categories');
            setCategories(data)
        }catch(err){
            console.log(err)
        }
    
    }
    
    const  handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            console.log(name,description,category,price,shipping,quantity);
            const productData = new FormData();
            productData.append('photo', photo);
            productData.append('name', name);
            productData.append('description', description);
            productData.append('category', category);
            productData.append('price', price);
            productData.append('shipping', shipping);
            productData.append('quantity', quantity);
            console.log([...productData]);

            const {data} =await axios.post('/product', productData);
                if(data?.error) {
                    toast.error(data.error);             
                }else{
                    toast.success(`${data.name} Product created `);
                    navigate('/dashboard/admin/products')    
                }
        }
        catch(err){
            console.log(err)
            toast.error(err)
        }
    }

    useEffect(()=>{
        loadCategories()
    })

    return (
        <>
            <Jumbotron title={`Hello ${auth?.user?.name}`} subtitle=" Admin Product Dashboard " ></Jumbotron>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu></AdminMenu>
                    </div>
                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-light"> Product Information  </div>
                        {photo && <div className='text-center'> 
                             <img src={URL.createObjectURL(photo)}  className="img img-responsive" 
                             height="200px" ></img>   



                        </div> }
                        <div className='mt-3'>
                            <label className='btn btn-outline-secondary col-12 mb-3'>
                                {photo ? photo.name : 'Upload photo'}
                            <input type='file' name="photo" accept='image/*' onChange={(e)=>{
                                setPhoto(e.target.files[0]) 
                            }} hidden ></input>
                            </label>
                        </div>
                        
                        <div >
                        <input type='text' className='form-control p-2 mb-2' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Name'></input>
                        </div><div className='mt-3'>
                        <textarea className='form-control p-2 mb-2' value={description} onChange={(e)=>setDescription(e.target.value)}  placeholder='Description'></textarea>
                        </div><div className='mt-3'>    
                        <Select  //showSearch  
                            size='large' className='form-select mb-3'   
                            placeholder="Select a Category"  onChange={(value)=>{
                                setCategory(value);
                            }}  >
                            {categories?.map((c)=> <Option key={c._id} value={c._id}> {c.name}</Option>
                            )}
                         </Select>
                         </div><div className='mt-3'>
                         <input type='number' min="0.1" className='form-control mb-2' value={price} onChange={(e)=>setPrice(e.target.value)}   placeholder='Price'></input>
                         </div><div className='mt-3'>
                         <Select   size='large' className='form-select mb-3'   
                            placeholder="Shipping applicable"  onChange={(value)=>{
                                setShipping(value);
                            }}  >
                             <Option  value="1"> Yes</Option>
                             <Option  value="0"> No</Option>
                         </Select>
                        </div><div className='mt-3'>
                        <input type='number' min="1" className='form-control  mb-2' value={quantity} onChange={(e)=>setQuantity(e.target.value)}   placeholder='Quantity'></input>
                        </div>
                        <button className='btn btn-primary mb-5' onClick={handleSubmit}>  Submit</button>
                    </div>
                </div>
            </div> 
        </>


    )
    }