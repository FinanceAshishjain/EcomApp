import mongoose from "mongoose";
import category from "./category.js"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema;


const productSchema = new Schema({
    name : {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique : true,
    },
    slug : {
        type: String,
        trim: true,
        unique : true,
        lowercase: true
    },
    description : {
        type: String,
        trim: true,
        required: true,
        maxlength: 1000,
    },
    category : {
        type: ObjectId,
        ref: "Category",
        required: true,
    },
   price : {
    type: Number,
    required: true,
    trim : true,
   },
   quantity : {
    type: Number,
    required: true,
    trim : true,
   },
   sold : {
    type: Number,
    default : 0,
   },
   photo : {
    data: Buffer,
    contentType : String,
    },
    shipping : {
        required: false,
        type: Boolean,
    }
},
{timestamps : true}
);

export default mongoose.model("Product", productSchema)
