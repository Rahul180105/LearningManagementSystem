import { Enrollment,EnrollmentStatus } from "@lms/shared-db"
import { sequelize } from "@lms/shared-db"

export const enrollUser = async (data: any) => {
  const existing = await Enrollment.findOne({
    where: {
      userId: data.userId,
      courseId: data.courseId,
    },
  })

  if (existing) {
    throw new Error("User already enrolled")
  }

  return Enrollment.create({
    ...data,
  })
}

export const bulkEnrollUsers = async (data: any) => {
  const transaction = await sequelize.transaction()

  try {
    for (const userId of data.userIds) {
      await Enrollment.findOrCreate({
        where: { userId, courseId: data.courseId },
        defaults: {
          userId,
          courseId: data.courseId,
          dueDate: data.dueDate,
        },
        transaction,
      })
    }

    await transaction.commit()
    return { message: "Bulk enrollment successful" }
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

export const getEnrollments = async (query: any) => {
  return Enrollment.findAll({ where: query })
}

export const dropEnrollment = async (id: number) => {
  const enrollment = await Enrollment.findByPk(id)
  if (!enrollment) return null

  await enrollment.update({ status:EnrollmentStatus.DROPPED })
  return enrollment
}