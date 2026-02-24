import { User } from "./user.model";
import { Role } from "./role.model";
import { Permission } from "./permission.model";
import { UserRole } from "./userRole.models";
import { RolePermission } from "./rolePermission.model";
import { RefreshToken } from "./refreshToken.model";
import { sequelize } from "../database";
import { PasswordResetToken } from "./passwordResetToken.model";
import { Course } from "./course.model";
import { Module } from "./module.model";
import { Enrollment } from "./enrollment.model";
export * from './passwordResetToken.model';


User.belongsToMany(Role,{
    through:UserRole,
    foreignKey:'user_id',
    otherKey:'role_id'
});
Role.belongsToMany(User,{
    through:UserRole,
    foreignKey:'role_id',
    otherKey:'user_id'
});

Role.belongsToMany(Permission,{
    through:RolePermission,
    foreignKey:'role_id',
    otherKey:'permission_id'
});
Permission.belongsToMany(Role,{
    through:RolePermission,
    foreignKey:'permission_id',
    otherKey:'role_id'
});

User.hasMany(RefreshToken,{
    foreignKey:'user_id',
});
RefreshToken.belongsTo(User,{
    foreignKey:'user_id'
});

User.hasMany(PasswordResetToken,{foreignKey:'user_id'});
PasswordResetToken.belongsTo(User,{foreignKey:'user_id'});

Course.hasMany(Module,{
    foreignKey:"courseId",
    onDelete:"CASCADE"
})
Module.belongsTo(Course,{
    foreignKey:"courseId"
})

export {sequelize,User,Role,Permission,UserRole,RefreshToken,RolePermission,Course,Module,Enrollment};

