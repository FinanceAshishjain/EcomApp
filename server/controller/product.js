import Product from '../model/product.js'
import slugify from 'slugify'
import fs from 'fs'


export const create =  async (req, res) => {
    try{
        const {name,  description, category, price, quantity, shipping ,sold} = req.fields;
        const {photo} = req.files;
        switch (true){
            case !name : return res.json({error : "Name missing"});
            case !name.trim() : return res.json({error : "Name blank"});
            case !description || !description.trim() : return res.json({error : "description blank"});
            case !category || !category.trim() : return res.json({error : "category blank"});
            case !price || !price.trim() : return res.json({error : "price blank"});
            case !quantity || !quantity.trim() : return res.json({error : "quantity blank"});
            case !shipping || !shipping.trim() : return res.json({error : "shipping blank"});
            case photo && photo.size >100000 : return res.json({error : "Image too big"});
          }
          const slug=slugify(name,"_");

          const product=await new Product({...req.fields,slug});
          if (photo){
              product.photo.data = fs.readFileSync(photo.path);
              product.photo.contentType = photo.type;
          }
          await product.save();
          console.log(product);  
          return res.status(200).json(product);   
             
    }catch(err) {
        console.log("encountered error")
        console.log(err)
        return res.status(400).json(err.message);
    }
}

export const update =  async (req, res) => {
    try{
        const {name,  description, category, price, quantity, shipping ,sold} = req.fields;
        const {photo} = req.files;
        switch (true){
            case !name : return res.json({error : "Name missing"});
            case !name.trim() : return res.json({error : "Name blank"});
            case !description || !description.trim() : return res.json({error : "description blank"});
            case !category || !category.trim() : return res.json({error : "category blank"});
            case !price || !price.trim() : return res.json({error : "price blank"});
            case !quantity || !quantity.trim() : return res.json({error : "quantity blank"});
            case !shipping || !shipping.trim() : return res.json({error : "shipping blank"});
            case photo && photo.size >100000 : return res.json({error : "Image too big"});
          }
          const slug=slugify(name,"_");

          const product=await  Product.findByIdAndUpdate(req.params.productId,{
            ...req.fields, slug
          }, {new:true});
          if (photo){
              product.photo.data = fs.readFileSync(photo.path);
              product.photo.contentType = photo.type;
          }
          await product.save();
          console.log(product);  
          return res.status(200).json(product);   
             
    }catch(err) {
        console.log("encountered error")
        console.log(err)
        return res.status(400).json(err.message);
    }
}



export const remove =  async (req, res) => {
    try{
        const {productId} = req.params;
        const existingProduct=  await Product.findByIdAndDelete(productId).select("-photo");
        res.json(existingProduct);
        } catch(err) {
        console.log("encountered error")
        console.log(err)
        return res.status(400).json(err);
        }
    }

export const list =  async (req, res) => {
    try{
        const listProduct=await Product.find({}).populate("category").select("-photo").limit(10).sort({createdAt: -1});

        res.json(listProduct);
        } catch(err) {
        console.log("encountered error")
        console.log(err)
        return res.status(400).json(err);
        }
    }
 
export const getOne =  async (req, res) => {
    try{
        const {slug} = req.params;
        const existingProduct=  await Product.findOne({slug}).populate("category").select("-photo")
        if(!existingProduct){
            return res.json({error:"Product not found"});
        } 
        return res.json(existingProduct)
    } catch(err) {
        console.log("encountered error")
        console.log(err)
        return res.status(400).json(err);
        }
    }

export const getProductPhoto = async(req,res) =>{
    try{
        const product=await Product.findById(req.params.productId).select("photo");
        if(product.photo.data) {
            res.set('Content-Type', product.photo.contentType);
            return res.send(product.photo.data)

        }
    }
    catch(err){
        console.log("encountered error")
        console.log(err)
        return res.status(400).json(err);

    }
}
