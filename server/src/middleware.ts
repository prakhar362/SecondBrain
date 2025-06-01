import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "./config"; 
import jwt from "jsonwebtoken"; 

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // Extract the "authorization" header from the request and put token beside it in postman
    const header = req.headers["authorization"];
    
    //console.log("middleware received", JWT_SECRET)
    // Verify the JWT token using the secret key.
    const decoded = jwt.verify(header as string, JWT_SECRET as string);
    //console.log("this is decoded object: ",decoded);

    if (decoded) {
        // @ts-ignore
        req.userId = decoded.userId; // Store the decoded user ID for later use in request handling.
        next(); 
    } else {
        // If the token is invalid, send a 401 Unauthorized response.
        res.status(401).json({ message: "Unauthorized User" });
    }
};