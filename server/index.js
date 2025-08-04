// Framework level
import express from 'express'
import dotnev from 'dotenv'
import mongoose from 'mongoose'
import morgan from 'morgan'

import authRoutes from './routes/auth.js'
import categoryRoutes from './routes/category.js'
import productRoutes from './routes/product.js'

import cors from 'cors' 
 


dotnev.config();

const app = express()

mongoose.connect(process.env.mongoUri)
.then(()=> console.log("DB connected"))
.catch((err)=>console.log("Error while connecting =>", err));

app.use(morgan("dev"))
app.use(express.json())
app.use(cors())

// Framework level


app.use("/api",authRoutes);
app.use("/api", categoryRoutes)
app.use("/api", productRoutes)

// app.use((req,res,next)=>{
//     console.log('Middleware')
//     next()
// });

// app.get("/users",(req,res)=>{
//     res.json({
//        data:"ashish jain",     

//     });

// });

const port=process.env.PORT || 8001;

app.listen(port, () => {
    console.log(`Server is on port ${port}`)
});