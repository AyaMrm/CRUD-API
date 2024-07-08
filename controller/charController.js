import character from "../model/charModel.js";
import internalErr from "../middleware/internalErr.js";
import notFoundErr from "../middleware/notFoundErr.js";

// get all chars
export const fetch = async(req, res, next) =>{
    try {
        const characters = await character.find();
        if(characters.length === 0){
            return next(notFoundErr());
        }
        res.status(200).json(characters);
        
    } catch (error) {
        next(internalErr(error));
    }
}


// create nez char
export const create = async(req, res) =>{
    try {

        const charData = new character(req.body);
        const {id} = charData;
        const charExist = await character.findOne({id});
        if(charExist){
            return res.status(400).json({message: "User already exist"});
        }
        const savedChar = await charData.save();
        res.status(200).json(savedChar);

    } catch (error) {
        next(internalErr(error)); //res.status(500).json({error: "Internal server error"});
    }
}


// update char
export const update = async (req, res) =>{
    try {

        const id = req.params.id;
        const charExist = await character.findOne({_id:id})
        if(!charExist){
            return next(notFoundErr());//res.status(404).json({message: "user not found"});
        }
        const updatedChar = await character.findByIdAndUpdate(id, req.body, {new:true})
        res.status(201).json(updatedChar);
        
    } catch (error) {
        next(internalErr(error));//res.status(500).json({error: "Internal server error"});
    }
}


// delete a char from database
export const deleteChar = async (req, res) =>{
       try {

         const id = req.params.id;
         const charExist = await character.findOne({_id:id})
         if(!charExist){
            return res.status(404).json({message: "user not found"});
         }

        await character.findByIdAndDelete(id);
        res.status(201).json({message: "user deleted successfully"});
    
       } catch (error) {
           next(internalErr(error)); //res.status(500).json({error: "Internal server error"});
       }
}


