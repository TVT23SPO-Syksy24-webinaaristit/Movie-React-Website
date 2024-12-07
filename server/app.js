import express from 'express';
import cors from 'cors';
import userRouter from "./routers/userRouter.js";
import testRouter from "./routers/testRouter.js";
import groupsRouter from './routers/groupsRouter.js'


const app = express();


//Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json()); //this should also parse any json
app.use(express.urlencoded({extended: false}));

app.use("/user", userRouter);

app.use("/groups", groupsRouter);

app.use("/test", testRouter);//TEST





//General error handling
app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({error: err.message})
});


export default app;