import express from 'express'
import formidable from 'express-formidable';

import { create, list, getOne, getProductPhoto, remove, update } from '../controller/product.js'

import { requireSignIn, IsAdmin } from '../middleware/auth.js';

const router=express.Router();

router.post("/product", requireSignIn, IsAdmin,formidable(), create)
 router.put("/product/:productId", requireSignIn, IsAdmin,formidable(), update)
router.delete("/product/:productId", requireSignIn, IsAdmin, remove)
router.get("/products", list)
router.get("/product/:slug", getOne)
router.get("/product/photo/:productId", getProductPhoto)


export default router;