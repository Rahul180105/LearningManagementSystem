import type { Request,Response,NextFunction } from "express";
import type { ZodObject } from "zod";

export const validate=(schema:ZodObject)=>(req:Request,res:Response,next:NextFunction)=>{
    try{
        req.body=schema.parse(req.body)
        next()
    }catch(error:any){
        return res.status(400).json({
            message:"validation error",
            errors:error.errors
        })
    }
}