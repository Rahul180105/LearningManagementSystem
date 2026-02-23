import type { Request,Response } from "express";
import { createCourseService,getAllCourses,getCourseByIdService } from "../services/course.service.ts";

export const createCourse=async (req:Request,res:Response)=>{
  try{
    const course=await createCourseService(req.body)
    return res.status(201).json(course)
  }catch(error:any){
    return res.status(400).json({
      message:error.message
    })
  }
}

export const getCourses=async (_req:Request,res:Response)=>{
  const courses=await getAllCourses()
  return res.json(courses)
}

export const getCourseById=async(req:Request,res:Response)=>{
  const course=await getCourseByIdService(Number(req.params.id))

  if(!course){
    return res.status(404).json({message:"Course not found"})
  }
  return res.json(course)
}