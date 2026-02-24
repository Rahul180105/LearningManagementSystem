import { createCourseService, getAllCourses, updateCourseService } from "../src/services/course.service"
import { Course } from "@lms/shared-db"

jest.mock("@lms/shared-db", () => ({
  Course: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn()
  }
}))

describe("Course Service", () => {

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should create a course", async () => {
    const mockCourse = {
      id: 1,
      code: "REACT-101",
      title: "React Basics"
    }

    ;(Course.create as jest.Mock).mockResolvedValue(mockCourse)

    const result = await createCourseService({
      code: "REACT-101",
      title: "React Basics",
      difficulty: "beginner",
      estimatedHours: 40
    })

    expect(Course.create).toHaveBeenCalledTimes(1)
    expect(result).toEqual(mockCourse)
  })

  it("should return all courses", async () => {
    const mockCourses = [{ id: 1 }, { id: 2 }]

    ;(Course.findAll as jest.Mock).mockResolvedValue(mockCourses)

    const result = await getAllCourses()

    expect(Course.findAll).toHaveBeenCalledTimes(1)
    expect(result).toEqual(mockCourses)
  })

  it("should update course",async()=>{
    const mockCourse={
      update:jest.fn().mockResolvedValue(true)
    };
    (Course.findByPk as jest.Mock).mockResolvedValue(mockCourse)
    const result = await updateCourseService(1,{title:"UPDATED"})

    expect(Course.findByPk).toHaveBeenCalledWith(1)
    expect(mockCourse.update).toHaveBeenCalled()
  })

})