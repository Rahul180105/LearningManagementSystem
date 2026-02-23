import {DataTypes,Model,Optional} from "sequelize";
import { sequelize } from "../database";

interface CourseAttributes{
    id:number
    code:string
    title:string
    description?:string
    status:"draft"|"published"|"archived"
    difficulty:"begginer"|"intermediate"|"advanced"
    estimatedHours:number
    createdAt?:Date
    updatedAt?:Date
}

interface CourseCreationAttributes extends Optional<CourseAttributes,"id"|"description">{}

export class Course extends Model<CourseAttributes,CourseCreationAttributes>
implements CourseAttributes{
    public id!:number
    public code!:string
    public title!:string
    public description?: string
    public status!: "draft" | "published" | "archived";
    public difficulty!: "begginer" | "intermediate" | "advanced";
    public estimatedHours!: number;
}

Course.init({
    id:{
        type:DataTypes.BIGINT,
        autoIncrement:true,
        primaryKey:true
    },
    code:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    description:{
        type:DataTypes.TEXT
    },
    status:{
        type:DataTypes.ENUM("draft","published","archived"),
        defaultValue:"draft"
    },
    difficulty:{
        type:DataTypes.ENUM("begginer","intermediate","advanced"),
        allowNull:false
    },
    estimatedHours:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    sequelize,
    tableName:"courses",
    timestamps:true
}
)
