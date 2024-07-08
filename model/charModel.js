import mongoose from "mongoose";

const powerschema = new mongoose.Schema({
    attack:{
        type:Number,
        required:true,
    },
    defense:{
        type:Number,
        required:true,
    }
})
const charSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
    level:{
        type:Number,
        required:true,
    },
    power:{
        type:powerschema,
        required:true,
    }
})

export default mongoose.model("character", charSchema);