// import { DataTypes, Model, Optional } from 'sequelize';
// import { sequelize } from '../database';
// import { BelongsToManyAddAssociationMixin,BelongsToManyGetAssociationsMixin } from 'sequelize';
// import type { Role } from './role.model';

// interface UserAttributes {
//   id: number;
//   email: string;
//   username: string;
//   password_hash: string;
//   first_name: string;
//   last_name: string;
//   department?: string;
//   status: string;
//   last_login_at?: Date;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// interface UserCreationAttributes
//   extends Optional<UserAttributes, 'id' | 'status' | 'department' | 'last_login_at' | 'createdAt' | 'updatedAt'> {}

// export class User
//   extends Model<UserAttributes, UserCreationAttributes>
//   implements UserAttributes
// {
//   declare id: number;
//   declare email: string;
//   declare username: string;
//   declare password_hash: string;
//   declare first_name: string;
//   declare last_name: string;
//   declare department?: string;
//   declare status: string;
//   declare last_login_at?: Date;
//   declare readonly createdAt?: Date;
//   declare readonly updatedAt?: Date;

//   declare addRole:BelongsToManyAddAssociationMixin<Role,number>;
//   declare getRole:BelongsToManyGetAssociationsMixin<Role>;
// }

// User.init(
//   {
//     id: {
//       type: DataTypes.BIGINT,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     password_hash: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     first_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     last_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     department: DataTypes.STRING,
//     status: {
//       type: DataTypes.STRING,
//       defaultValue: 'active',
//     },
//     last_login_at: DataTypes.DATE,
//   },
//   {
//     sequelize,
//     tableName: 'users',
//     timestamps: true,
//   }
// );
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';
import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
} from 'sequelize';
import type { Role } from './role.model';

interface UserAttributes {
  id: number;
  email: string;
  username: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  department?: string;
  status: string;
  last_login_at?: Date;

  reset_otp?: string|null;
  reset_otp_expiry?: Date|null;

  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    | 'id'
    | 'status'
    | 'department'
    | 'last_login_at'
    | 'reset_otp'
    | 'reset_otp_expiry'
    | 'createdAt'
    | 'updatedAt'
  > {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: number;
  declare email: string;
  declare username: string;
  declare password_hash: string;
  declare first_name: string;
  declare last_name: string;
  declare department?: string;
  declare status: string;
  declare last_login_at?: Date;

  declare reset_otp?: string|null;
  declare reset_otp_expiry?: Date|null;

  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;

  declare addRole: BelongsToManyAddAssociationMixin<Role, number>;
  declare getRole: BelongsToManyGetAssociationsMixin<Role>;
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
    department: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active',
    },
    last_login_at: DataTypes.DATE,

    reset_otp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reset_otp_expiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
);