import Category from '../model/category.js'
import slugify from 'slugify'


export const create =  async (req, res) => {
    console.log("catagory creation  : ",req.body);
    try{
    const {name} = req.body;
    console.log(req.body);    
    if(!name){
        return res.json({error:"Name cannot be blank"});
    }
    if(!name.trim()){
        return res.json({error:"Name cannot be blank"});
    }

    const existingCategory=  await Category.findOne({name})
    console.log(existingCategory);
    
    if(existingCategory){
        return res.json({error:"Name is in use"});
    }    

    const slug=slugify(name,"_");

    const category=await new Category({name,slug}).save()
    return res.status(200).json(category);   
    } catch(err) {
        console.log("encountered error")
        console.log(err)
        return res.status(400).json(err);
    }
}

export const update =  async (req, res) => {
    try{
        const {name} = req.body;
        const {categoryId} = req.params;
        const existingCategory=  await Category.findByIdAndUpdate(categoryId,
            {
                name,
                slug: slugify(name)
            },
            {new : true}
        )
    console.log("catagory creation  : ",req.body);
    res.json(existingCategory);
    } catch(err) {
    console.log("encountered error")
    console.log(err)
    return res.status(400).json(err);
    }

}

export const remove =  async (req, res) => {
    try{
        const {categoryId} = req.params;
        const existingCategory=  await Category.findByIdAndDelete(categoryId);
        res.json(existingCategory);
        } catch(err) {
        console.log("encountered error")
        console.log(err)
        return res.status(400).json(err);
        }
    }

export const list =  async (req, res) => {
    try{
        const listCategory=await Category.find({});

        res.json(listCategory);
        } catch(err) {
        console.log("encountered error")
        console.log(err)
        return res.status(400).json(err);
        }
    }
 
export const getOne =  async (req, res) => {
    console.log("get one")
    try{
        const {slug} = req.params;
        console.log("finding one")
        const existingCategory=  await Category.findOne({slug})
        if(!existingCategory){
            return res.json({error:"Category not found"});
        } 
        console.log("Found one", existingCategory)   
        return res.json(existingCategory)
    } catch(err) {
        console.log("encountered error")
        console.log(err)
        return res.status(400).json(err);
        }
    }


