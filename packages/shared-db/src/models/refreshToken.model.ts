import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

interface RefreshTokenAttributes {
  id: number;
  user_id: number;
  token: string;
  expires_at: Date;
  revoked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface RefreshTokenCreationAttributes
  extends Optional<
    RefreshTokenAttributes,
    'id' | 'revoked' | 'createdAt' | 'updatedAt'
  > {}

export class RefreshToken
  extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes>
  implements RefreshTokenAttributes
{
  declare id: number;
  declare user_id: number;
  declare token: string;
  declare expires_at: Date;
  declare revoked: boolean;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

RefreshToken.init(
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
      type: DataTypes.TEXT,
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    revoked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'refresh_tokens',
    timestamps: true,
  }
);