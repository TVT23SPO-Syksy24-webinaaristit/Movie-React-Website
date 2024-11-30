import jwt from "jsonwebtoken"
const { verify } = jwt;
const authRequired = "Authorization required";
const invalidCredentials = "Invalid credentials";

const auth = (req,res,next) => {
    if(!req.headers.authorization) {
        res.statusMessage = authRequired;
        res.status(401).json({message: authRequired});
    } else {
        try {
            const token = req.headers.authorization;
            jwt.verify(token,process.env.JWT_SECRET_KEY);
            next()
        } catch (err) {
            res.statusMessage = invalidCredentials;
            res.status(403).json({invalidCredentials});
        };
    };
};

export { auth };