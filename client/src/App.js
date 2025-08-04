import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from './components/nav/Menu'
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/user/Dashboard'
import PrivateRoute  from "./components/routes/PrivateRoute";
import SecretPage from "./pages/Secret";
import AdminDashboard from "./pages/admin/adminDashboard";
import AdminRoute from "./components/routes/AdminRoute";
import Category from "./pages/admin/Category";
import Product from "./pages/admin/Product";
import Profile from "./pages/user/Profile"
import Orders from "./pages/user/Orders";
import Products from './pages/admin/products'


const PageNotFound= ()=>{
return <div className="d-flex justify-content-center align-items-center vh-100">404 Page Not Found</div>
}
export default function App() {
  return (
    <BrowserRouter>
    <Menu/>
    <Toaster></Toaster>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        {/* <Route path="/dashboard" element={<Dashboard />}></Route> */}

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />}></Route>
          <Route path="Secret" element={<SecretPage />}></Route>
          <Route path="user/Profile" element={<Profile />}></Route>
          <Route path="user/Orders" element={<Orders />}></Route>                    
      </Route>
      <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />}></Route>
          <Route path="admin/Category" element={<Category />}></Route>
          <Route path="admin/Product" element={<Product />}></Route>          
          <Route path="admin/Products" element={<Products />}></Route>          
      </Route>
      <Route path="*" element={<PageNotFound/>} replace></Route>
      
      </Routes>
    </BrowserRouter>
  );
}

