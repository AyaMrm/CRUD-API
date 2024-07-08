import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import route from "./routes/characterRoute.js";
//import notFounderr from "./middleware/notFoundErr.js";

const app = express();
app.use(express.json());
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const PORT = parseInt(process.env.PORT) || 3000;



// Connecter à la database et lancer le server
async function start() {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to the database!");

        app.listen(PORT, function () {
            console.log("Server is started on port " + PORT);
        });
    } catch (error) {
        console.log("ERROR...", error);
    }
}

app.use("/api/crud", route);


start();
