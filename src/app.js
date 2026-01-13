import express from "express"
import cors from "cors"

const app = express();

//basic configurations
app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));


//Cors configurations
app.use(cors({
    origin:process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
    methods: ['GET','POST','PUT','DELETE','PATCH'],
    allowedHeaders: ['Authorization','Content-type']
}))

import router from "./routes/poll.routes.js";

app.use("/", router)

console.log("app.js");

export default app;