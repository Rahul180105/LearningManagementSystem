import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../database"

export enum ModuleType {
  ONLINE = "online",
  OFFLINE = "offline",
}

interface ModuleAttributes {
  id: number
  courseId: number
  title: string
  description?: string
  sequenceOrder: number
  moduleType: ModuleType

  contentType?: string
  contentUrl?: string
  contentMetadata?: object
  estimatedMinutes?: number

  sessionDate?: Date
  sessionStartTime?: string
  sessionEndTime?: string
  location?: string
  virtualMeetingUrl?: string
  maxCapacity?: number

  isMandatory?: boolean
  prerequisites?: object

  createdAt?: Date
  updatedAt?: Date
}

interface ModuleCreationAttributes
  extends Optional<
    ModuleAttributes,
    | "id"
    | "description"
    | "contentType"
    | "contentUrl"
    | "contentMetadata"
    | "estimatedMinutes"
    | "sessionDate"
    | "sessionStartTime"
    | "sessionEndTime"
    | "location"
    | "virtualMeetingUrl"
    | "maxCapacity"
    | "isMandatory"
    | "prerequisites"
    | "createdAt"
    | "updatedAt"
  > {}

export class Module
  extends Model<ModuleAttributes, ModuleCreationAttributes>
  implements ModuleAttributes
{
  declare id: number
  declare courseId: number
  declare title: string
  declare description?: string
  declare sequenceOrder: number
  declare moduleType: ModuleType

  declare contentType?: string
  declare contentUrl?: string
  declare contentMetadata?: object
  declare estimatedMinutes?: number

  declare sessionDate?: Date
  declare sessionStartTime?: string
  declare sessionEndTime?: string
  declare location?: string
  declare virtualMeetingUrl?: string
  declare maxCapacity?: number

  declare isMandatory?: boolean
  declare prerequisites?: object

  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}

Module.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    courseId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "course_id",
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
    },

    sequenceOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "sequence_order",
    },

    moduleType: {
      type: DataTypes.ENUM(
        ModuleType.ONLINE,
        ModuleType.OFFLINE
      ),
      allowNull: false,
      field: "module_type",
    },

    contentType: {
      type: DataTypes.STRING,
      field: "content_type",
    },

    contentUrl: {
      type: DataTypes.TEXT,
      field: "content_url",
    },

    contentMetadata: {
      type: DataTypes.JSON,
      field: "content_metadata",
    },

    estimatedMinutes: {
      type: DataTypes.INTEGER,
      field: "estimated_minutes",
    },

    sessionDate: {
      type: DataTypes.DATEONLY,
      field: "session_date",
    },

    sessionStartTime: {
      type: DataTypes.TIME,
      field: "session_start_time",
    },

    sessionEndTime: {
      type: DataTypes.TIME,
      field: "session_end_time",
    },

    location: {
      type: DataTypes.STRING,
    },

    virtualMeetingUrl: {
      type: DataTypes.TEXT,
      field: "virtual_meeting_url",
    },

    maxCapacity: {
      type: DataTypes.INTEGER,
      field: "max_capacity",
    },

    isMandatory: {
      type: DataTypes.BOOLEAN,
      field: "is_mandatory",
    },

    prerequisites: {
      type: DataTypes.JSON,
    },

    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
    },

    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
    },
  },
  {
    sequelize,
    tableName: "modules",
    timestamps: true,
  }
)