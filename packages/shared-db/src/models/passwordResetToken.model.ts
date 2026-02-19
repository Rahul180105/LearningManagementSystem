import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

interface PasswordResetAttributes {
  id: number;
  user_id: number;
  token: string;
  expires_at: Date;
  used: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PasswordResetCreationAttributes
  extends Optional<PasswordResetAttributes, 'id' | 'used' | 'createdAt' | 'updatedAt'> {}

export class PasswordResetToken
  extends Model<PasswordResetAttributes, PasswordResetCreationAttributes>
  implements PasswordResetAttributes
{
  declare id: number;
  declare user_id: number;
  declare token: string;
  declare expires_at: Date;
  declare used: boolean;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

PasswordResetToken.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    used: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'password_reset_tokens',
    timestamps: true,
  }
);