import type { Request,Response } from "express";
import { RoleService } from "../services/role.service";
import { RolePermission } from "@lms/shared-db";

const roleSevice = new RoleService();


export class RoleController{
    async create(req:Request,res:Response){
        try{
            const role=await roleSevice.createRole(req.body.name,req.body.description);
            res.status(201).json(role);
        }catch(error:any){
            res.status(400).json({error:error.message});
        }
    }
    async getAll(req:Request,res:Response){

        const roles=await roleSevice.getAllRoles();
        res.json(roles);
    }
    async assignPermission(req:Request,res:Response){
        try{
            await roleSevice.assginPermission(Number(req.params.id),req.body.permissionId);
        }catch(error:any){
            res.status(400).json({error:error.message});
        }
    }
}