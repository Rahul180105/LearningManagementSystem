import { DataTypes, Model}from 'sequelize';
import type{BelongsToManyAddAssociationMixin,BelongsToManyGetAssociationsMixin} from 'sequelize';
import { sequelize } from '../config/database.config';
import type { Role } from './role.model';

export class User extends Model {
  public id!: number;
  public email!: string;
  public username!: string;
  public password_hash!: string;
  public first_name!: string;
  public last_name!: string;
  public department!: string;
  public status!: string;
  public last_login_at!: Date;

  public addRole!:BelongsToManyAddAssociationMixin<Role,number>;
  public getRole!:BelongsToManyGetAssociationsMixin<Role>;
}

User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active',
    },
    last_login_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
);