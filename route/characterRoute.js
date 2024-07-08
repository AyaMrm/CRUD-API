import express from "express";
import character from "../model/charModel.js"
import { create, deleteChar, fetch, update } from "../controller/charController.js";
import validateCharacter from "../middleware/valmiddleware.js"



const route = express.Router();


route.get("/characters", fetch)   // route to get all characters thedatabase
route.post("/create", validateCharacter, create);  // route to create a new char
route.put("/update/:id", validateCharacter , update)  // route to update a char by id
route.delete("/delete/:id", deleteChar); // route to delete a char from database

//route to add paging system 
route.get('/character', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    try {
        const chars = await character.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        const totalChars = await character.countDocuments();

        res.json({
            chars: chars,
            totalPages: Math.ceil(totalChars / pageSize),
            currentPage: page
        });
    } catch (err) {
        res.status(500).send(err);
    }
});
export default route;
