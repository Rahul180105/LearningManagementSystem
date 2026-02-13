import { User } from "./user.model";
import { Role } from "./role.model";
import { Permission } from "./permission.model";
import { UserRole } from "./userRole.models";
import { RolePermission } from "./rolePermission.model";

//connectiond
User.belongsToMany(Role,{
    through:UserRole,
    foreignKey:'user_id',
});
Role.belongsToMany(User,{
    through:UserRole,
    foreignKey:'role_id'
});

Role.belongsToMany(Role,{
    through:RolePermission,
    foreignKey:'role_id'
});
Permission.belongsToMany(Role,{
    through:RolePermission,
    foreignKey:'permission_id',
});

export {User,Role,Permission};

