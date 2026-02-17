import {Role,Permission} from '@lms/shared-db';

export class RoleService{

    async createRole(name:string,description:string){
        return Role.create({name,description});
    }
    async getAllRoles(){
        return Role.findAll({include:[Permission]});
    }
    async deleteRole(id:number){
        await Role.destroy({where:{id}});
    }
    async assginPermission(roleId:number,permissionId:number){
        const role=await Role.findByPk(roleId);
        const permission=await Permission.findByPk(permissionId);

        if(!role || !permission){
            throw new Error('Role or Permission not found');
        }
        await role.addPermission(permission);
    }

    async removePermission(roleId:number,permissionId:number){
        const role = await Role.findByPk(roleId);
        const permission = await Permission.findByPk(permissionId);

        if(!role || !permission){
            throw new Error('Role or Permission not found');
        }
        await role.removePermission(permission);
    }
}