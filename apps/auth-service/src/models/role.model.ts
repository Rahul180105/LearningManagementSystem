import { DataTypes,Model } from "sequelize";
import { sequelize } from "../config/database.config";

export class Role extends Model{
    public id!:number;
    public name!:string;
    public description!:string;
}

Role.init(
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
        },
        description:{
            type:DataTypes.STRING,
        }
    },
    {
        sequelize,
        tableName:'roles',
        timestamps:true,
    }
);