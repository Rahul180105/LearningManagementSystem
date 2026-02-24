import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../database"

export enum CourseStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

export enum DifficultyLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

interface CourseAttributes {
  id: number
  code: string
  title: string
  description?: string
  status: CourseStatus
  difficulty: DifficultyLevel
  estimatedHours?: number
  passingCriteria?: object
  createdBy?: number
  createdAt?: Date
  updatedAt?: Date
}

interface CourseCreationAttributes
  extends Optional<
    CourseAttributes,
    | "id"
    | "description"
    | "estimatedHours"
    | "passingCriteria"
    | "createdBy"
    | "createdAt"
    | "updatedAt"
  > {}

export class Course
  extends Model<CourseAttributes, CourseCreationAttributes>
  implements CourseAttributes
{
  declare id: number
  declare code: string
  declare title: string
  declare description?: string
  declare status: CourseStatus
  declare difficulty: DifficultyLevel
  declare estimatedHours?: number
  declare passingCriteria?: object
  declare createdBy?: number
  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}

Course.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
    },

    status: {
      type: DataTypes.ENUM(
        CourseStatus.DRAFT,
        CourseStatus.PUBLISHED,
        CourseStatus.ARCHIVED
      ),
      defaultValue: CourseStatus.DRAFT,
      allowNull: false,
    },

    difficulty: {
      type: DataTypes.ENUM(
        DifficultyLevel.BEGINNER,
        DifficultyLevel.INTERMEDIATE,
        DifficultyLevel.ADVANCED
      ),
      allowNull: false,
    },

    estimatedHours: {
      type: DataTypes.DECIMAL,
      field: "estimated_hours",
    },

    passingCriteria: {
      type: DataTypes.JSON,
      field: "passing_criteria",
    },

    createdBy: {
      type: DataTypes.BIGINT,
      field: "created_by",
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
    tableName: "courses",
    timestamps: true,
  }
)