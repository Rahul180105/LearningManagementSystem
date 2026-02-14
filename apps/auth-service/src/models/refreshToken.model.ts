import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.config';
import { User } from './user.model';

export class RefreshToken extends Model {
  public id!: number;
  public user_id!: number;
  public token!: string;
  public expires_at!: Date;
  public revoked!: boolean;
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