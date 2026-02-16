import { DataTypes,Model } from "sequelize";
import { sequelize } from "../database";

export class Permission extends Model{
    // public id!:number;
    // public name!:string;
    // public description!:string;
}

Permission.init(
    {
        id:{
          type:DataTypes.INTEGER,
          autoIncrement:true,
          primaryKey:true,
        },
        name:{
          type:DataTypes.STRING,
          allowNull:false,
          unique:true,
        },
        description:{
          type:DataTypes.STRING,
        }
    },{
        sequelize,
        tableName:'permissions',
        timestamps:true,
    }
);