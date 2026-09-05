import {z} from "zod"
import {Request,Response, NextFunction} from "express"

export const validate = (Schema:z.ZodType)=>{
    return(req:Request,res:Response,next:NextFunction)=>{
        const result = Schema.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({
                message:"Validation Failed",
                error:z.treeifyError(result.error)
            });
        }
        req.body = result.data;
        next();
    };
} 