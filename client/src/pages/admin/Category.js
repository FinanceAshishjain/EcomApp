import AdminMenu from '../../components/nav/AdminMenu.js'
import CategoryForms from '../../components/Forms/categoryForms.js'
import { useState, useEffect } from 'react';
import { useAuth  } from "../../context/auth"
import Jumbotron from "../../components/cards/jumbotron"
import axios from 'axios';
import toast from 'react-hot-toast'
import {Modal} from 'antd'


export default function Category(){

    const [auth, setAuth]= useAuth();
    const[name,setName] = useState("");
    const[categories,setCategories] = useState([]);
    const[visible, setVisible] = useState(false);
    const [CategoryToEdit, setCategoryToEdit ] = useState(null);
    const [updateName, setUpdateName ] = useState("");
    

    useEffect(()=>{
    loadCategories();
},[])
 

const loadCategories= async ()=> {
    try{
        const {data} = await  axios.get('/categories');
        console.log(data)
        setCategories(data)
    }catch(err){
        console.log(err)
    }

}

const handleDelete = async (e)=>{
    e.preventDefault();
    try{
       const {data}=await axios.delete(`/category/${CategoryToEdit._id}`);
       console.log(data)
       if(data?.error){
        toast.error(data.error);
       }else {
        setUpdateName("")
        setCategoryToEdit(null)
        setVisible(false);
        loadCategories()

        toast.success(`${data.name} - is Deleted.`)
       }     
    }
    catch(err){
        console.log(err);
        toast.error('Update category failed.')
    } 

}


const handleUpdate = async (e)=>{
    e.preventDefault();
    try{
       const {data}=await axios.put(`/category/${CategoryToEdit._id}`,{name:updateName});
       console.log(data)
       if(data?.error){
        toast.error(data.error);
       }else {
        setUpdateName("")
        setCategoryToEdit(null)
        setVisible(false);
        loadCategories()

        toast.success(`${data.name} - is Updated.`)
       }     
    }
    catch(err){
        console.log(err);
        toast.error('Update category failed.')
    } 

}


const handleSubmit= async (e)=>{
    e.preventDefault();
    try{
       const {data}=await axios.post('/category',{name});
       console.log(data)
       if(data?.error){
        toast.error(data.error);
       }else {
        setName("")
        loadCategories()
        toast.success(`${data.name} - Category created.`)
       }     
    }
    catch(err){
        console.log(err);
        toast.error('create category failed.')
    } 

}


    return (
        <>
            <Jumbotron title={`Hello ${auth?.user?.name}`} subtitle=" Admin Category Dashboard " ></Jumbotron>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu></AdminMenu>
                    </div>
                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-light"> Create Category </div>
                        <div className='p-3'>
                                <CategoryForms value={name} setValue={setName} handleSubmit={handleSubmit} buttonText='Save' ></CategoryForms>
                                <hr></hr>
                        </div>
                        <div className='d-flex'>
                                    {categories?.map((c)=>
                                        <button key={c._id} className='btn btn-outline-primary m-3 ' onClick={()=>{
                                            setVisible(true);
                                            setCategoryToEdit(c)
                                            setUpdateName(c.name)                                            
                                        }}>{c.name}</button>
                                        )}

                                </div>
                    <Modal open={visible} onOk={()=>{
                                            setVisible(false);
                                            
                                        }} onCancel={()=>{
                                            setVisible(false);
                                            
                                        }} footer={null}>
                                        <CategoryForms value={updateName} setValue={setUpdateName} handleSubmit={handleUpdate}  buttonText='Update' handleDelete={handleDelete} ></CategoryForms>

                                        </Modal>
                    </div>                                            
                </div>
            </div> 
        </>


    )
    }