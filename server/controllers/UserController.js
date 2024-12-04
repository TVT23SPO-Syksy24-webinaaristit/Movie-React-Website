import {hash, compare} from "bcrypt";
import { deleteUserById, insertUser, selectUserByEmail, selectUserById } from "../models/User.js";
import { ApiError } from "../helpers/ApiError.js"

// Error Helper HERE
import jwt from "jsonwebtoken"

const { sign } = jwt; //creating webtoken base with library

const postRegistration = async(req,res,next) => {
    try {
        if (!req.body.email || req.body.email.length === 0) return next(new ApiError("Invalid email for user", 400)) //checking email inputted is not blank
        if (!req.body.email || req.body.password.length < 8) return next(new ApiError("Invalid password for user",400)) //checking that password is not too short
        const hashedPassword = await hash(req.body.password,10); //Hash the password inputted from frontend
        const userFromDb = await insertUser(req.body.username, req.body.email, hashedPassword); //Inserting user to database with function from User.js model
        const user = userFromDb.rows[0]; //Taking the first row from database response containing info of inserted user
        return res.status(201).json(createUserObject(user.id, user.email, user.username)); //returning successful status message with user object
    } catch(error) {
        return next(error);
    };
};

const postLogin = async(req,res,next) => {
    const invalidCredentialsMessage = "Invalid Credentials";
    try {
        const userFromDb = await selectUserByEmail(req.body.email); //Selecting by inputted email from frontend in the database
        if (userFromDb.rowCount === 0) return next(new ApiError(invalidCredentialsMessage)); //Checking if the user exists

        const user = userFromDb.rows[0];
        if (!await compare(req.body.password, user.password)) return next (new ApiError(invalidCredentialsMessage)); //Comparing user inputted password to the one in the database
        const token = sign(req.body.email, process.env.JWT_SECRET_KEY); //creating a personalized webtoken for user after passing all checks that includes webtoken's secret key from the env file.
        return res.status(200).json(createUserObject(user.id, user.email, user.username, token)); //returning token to frontend
    } catch (error) {
        return next(error);
    };
};

const deleteAccount = async(req,res,next) =>{
    try{
        if(!req.params.id === null) return next(new ApiError("User id not found",400))
        const userid = req.params.id;
        await deleteUserById(req.params.id);
        return res.status(200).json({id: userid});
    } catch(error){
        return next(error);
    }
}

const createUserObject = (id, email, username, token = undefined) => {
    return {
        "id":id,
        "email":email,
        "username":username,
        ...(token !== undefined) && {"token":token}
    };
};

export { postRegistration, postLogin, deleteAccount };