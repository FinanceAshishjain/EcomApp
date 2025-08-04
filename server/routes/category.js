import express from 'express'

import { create, update, remove, list, getOne } from '../controller/category.js'

import { requireSignIn, IsAdmin } from '../middleware/auth.js';

const router=express.Router();

router.post("/category", requireSignIn, IsAdmin, create)
router.put("/category/:categoryId", requireSignIn, IsAdmin, update)
router.delete("/category/:categoryId", requireSignIn, IsAdmin, remove)
router.get("/categories", list)
router.get("/category/:slug", getOne)


export default router;