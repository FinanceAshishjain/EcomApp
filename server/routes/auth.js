import express from 'express'

import { register, login, secret } from '../controller/auth.js'

import { requireSignIn, IsAdmin } from '../middleware/auth.js';

const router=express.Router();

router.post("/register",register)
router.post("/login",login)

router.get("/auth-check", requireSignIn, (req,res) =>{
    res.json({ok:true});
});

router.get("/admin-check", requireSignIn,IsAdmin, (req,res) =>{
    res.json({ok:true});
});


router.get("/secret", requireSignIn, IsAdmin, secret)



export default router;