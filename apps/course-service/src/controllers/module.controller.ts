import type{ Request,Response } from "express";
import { createModuleService,getModuleByCourseService,updateModuleService,deleteModuleService } from "../services/module.service.ts";

export const createModule = async(req:Request,res:Response)=>{
    const result = await createModuleService(Number(req.params.id),req.body)

    if (!result)
        return res.status(404).json({message:"Course nt found"})

    return res.status(201).json(result)
}

export const getModuleByCourse= async(req:Request,res:Response)=>{
    const modules=await getModuleByCourseService(Number(req.params.id))
    return res.json(modules)
}

export const updateModule=async(req:Request,res:Response)=>{
    const updated = await updateModuleService(Number(req.params.id),req.body)
    if(!updated)
        return res.status(404).json({messsage:"Module not found"})
    return res.json(updated)
}

export const deleteModule=async(req:Request,res:Response)=>{
    const deleted=await deleteModuleService(Number(req.params.id))
    if(!deleted)
     return res.status(404).json({message:"module not found"})
    return res.json({message:"Module deleted"})
}

