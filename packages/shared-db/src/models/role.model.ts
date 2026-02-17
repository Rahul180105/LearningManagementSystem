import { BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyRemoveAssociationMixin, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';
import { Permission } from './permission.model';

interface RoleAttributes {
  id: number;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface RoleCreationAttributes
  extends Optional<RoleAttributes, 'id' | 'description' | 'createdAt' | 'updatedAt'> {}

export class Role
  extends Model<RoleAttributes, RoleCreationAttributes>
  implements RoleAttributes
{
  declare id: number;
  declare name: string;
  declare description?: string;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;

  declare addPermission:BelongsToManyAddAssociationMixin<Permission,number>;
  declare removePermission:BelongsToManyRemoveAssociationMixin<Permission,number>;
  declare getPermission:BelongsToManyGetAssociationsMixin<Permission>;
}

Role.init(
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
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'roles',
    timestamps: true,
  }
);