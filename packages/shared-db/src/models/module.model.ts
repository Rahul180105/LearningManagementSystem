import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../database"

interface ModuleAttributes {
  id: number
  courseId: number
  title: string
  description?: string
  moduleType: "online" | "offline"
  contentType?: "video" | "document" | "link"
  contentUrl?: string
  sequenceOrder: number
  estimatedMinutes?: number
  isMandatory: boolean
  sessionDate?: Date
  location?: string
  createdAt?: Date
  updatedAt?: Date
}

interface ModuleCreationAttributes
  extends Optional<
    ModuleAttributes,
    "id" | "description" | "contentType" | "contentUrl" | "estimatedMinutes" | "sessionDate" | "location"
  > {}

export class Module
  extends Model<ModuleAttributes, ModuleCreationAttributes>
  implements ModuleAttributes
{
  public id!: number
  public courseId!: number
  public title!: string
  public description?: string
  public moduleType!: "online" | "offline"
  public contentType?: "video" | "document" | "link"
  public contentUrl?: string
  public sequenceOrder!: number
  public estimatedMinutes?: number
  public isMandatory!: boolean
  public sessionDate?: Date
  public location?: string
}

Module.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    courseId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    moduleType: {
      type: DataTypes.ENUM("online", "offline"),
      allowNull: false
    },
    contentType: {
      type: DataTypes.ENUM("video", "document", "link")
    },
    contentUrl: {
      type: DataTypes.STRING
    },
    sequenceOrder: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estimatedMinutes: {
      type: DataTypes.INTEGER
    },
    isMandatory: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    sessionDate: {
      type: DataTypes.DATE
    },
    location: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    tableName: "modules",
    timestamps: true
  }
)

