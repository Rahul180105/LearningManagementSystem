import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';
import type {
  BelongsToManyAddAssociationMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyGetAssociationsMixin,
} from 'sequelize';
import type { Role } from './role.model';

interface PermissionAttributes {
  id: number;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PermissionCreationAttributes
  extends Optional<PermissionAttributes, 'id'> {}

export class Permission
  extends Model<PermissionAttributes, PermissionCreationAttributes>
  implements PermissionAttributes
{
  declare id: number;
  declare name: string;
  declare description?: string;

  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;

  // 👇 Association Mixins (important for TypeScript)
  declare addRole: BelongsToManyAddAssociationMixin<Role, number>;
  declare removeRole: BelongsToManyRemoveAssociationMixin<Role, number>;
  declare getRoles: BelongsToManyGetAssociationsMixin<Role>;
}

Permission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: 'permissions',
    timestamps: true,
  }
);