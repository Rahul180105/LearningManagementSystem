import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../database"

export enum EnrollmentStatus {
  ENROLLED = "enrolled",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  DROPPED = "dropped",
  OVERDUE = "overdue",
}

interface EnrollmentAttributes {
  id: number
  userId: number
  courseId: number
  status: EnrollmentStatus
  enrolledAt?: Date
  startedAt?: Date
  completedAt?: Date
  dueDate?: Date
  enrollmentSource?: string
  enrolledBy?: number
  completionPercentage?: number
}

interface EnrollmentCreationAttributes
  extends Optional<
    EnrollmentAttributes,
    | "id"
    | "status"
    | "enrolledAt"
    | "startedAt"
    | "completedAt"
    | "dueDate"
    | "enrollmentSource"
    | "enrolledBy"
    | "completionPercentage"
  > {}

export class Enrollment
  extends Model<EnrollmentAttributes, EnrollmentCreationAttributes>
  implements EnrollmentAttributes
{
  declare id: number
  declare userId: number
  declare courseId: number
  declare status: EnrollmentStatus
  declare enrolledAt?: Date
  declare startedAt?: Date
  declare completedAt?: Date
  declare dueDate?: Date
  declare enrollmentSource?: string
  declare enrolledBy?: number
  declare completionPercentage?: number
}

Enrollment.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "user_id",
    },

    courseId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "course_id",
    },

    status: {
      type: DataTypes.ENUM(
        EnrollmentStatus.ENROLLED,
        EnrollmentStatus.IN_PROGRESS,
        EnrollmentStatus.COMPLETED,
        EnrollmentStatus.DROPPED,
        EnrollmentStatus.OVERDUE
      ),
      defaultValue: EnrollmentStatus.ENROLLED,
      allowNull: false,
    },

    enrolledAt: {
      type: DataTypes.DATE,
      field: "enrolled_at",
      defaultValue: DataTypes.NOW,
    },

    startedAt: {
      type: DataTypes.DATE,
      field: "started_at",
    },

    completedAt: {
      type: DataTypes.DATE,
      field: "completed_at",
    },

    dueDate: {
      type: DataTypes.DATEONLY,
      field: "due_date",
    },

    enrollmentSource: {
      type: DataTypes.STRING,
      field: "enrollment_source",
    },

    enrolledBy: {
      type: DataTypes.BIGINT,
      field: "enrolled_by",
    },

    completionPercentage: {
      type: DataTypes.DECIMAL,
      field: "completion_percentage",
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "enrollments",
    timestamps: false,
  }
)