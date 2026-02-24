import { Course,Module } from "@lms/shared-db";

export const createModuleService=async(courseId:number,data:any)=>{
    const course = await Course.findByPk(courseId)
    if(!course) return null

    const module=await Module.create({...data,courseId})
    return module
}
export const getModuleByCourseService=async(courseId:number)=>{
    return Module.findAll({where:{courseId},order:[["sequenceOrder","ASC"]]})
}
export const updateModuleService = async(
    id:number,
    data:any
)=>{
    const module=await Module.findByPk(id)
    if(!module) return null
    await module.update(data)
    return module
}
export const deleteModuleService=async(id:number)=>{
    const module = await Module.findByPk(id)
    if(!module) return null

    await module.destroy()
    return true
}