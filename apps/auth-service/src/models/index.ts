import { User } from "./user.model";
import { Role } from "./role.model";
import { Permission } from "./permission.model";
import { UserRole } from "./userRole.models";
import { RolePermission } from "./rolePermission.model";
import { RefreshToken } from "./refreshToken.model";

//connectiond
User.belongsToMany(Role,{
    through:UserRole,
    foreignKey:'user_id',
});
Role.belongsToMany(User,{
    through:UserRole,
    foreignKey:'role_id'
});

Role.belongsToMany(Permission,{
    through:RolePermission,
    foreignKey:'role_id'
});
Permission.belongsToMany(Role,{
    through:RolePermission,
    foreignKey:'permission_id',
});

User.hasMany(RefreshToken,{
    foreignKey:'user_id',
});
RefreshToken.belongsTo(User,{
    foreignKey:'user_id'
});

export {User,Role,Permission,UserRole,RefreshToken};

