import {Course} from '@lms/shared-db';

export const createCourseService=async(data:any)=>{
  return await Course.create(data)
}

export const getAllCourses=async()=>{
  return await Course.findAll()
}

export const getCourseByIdService=async(id:number)=>{
  return await Course.findByPk(id)
}