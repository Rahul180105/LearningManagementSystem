import type { Request, Response, NextFunction } from "express";
import * as courseService from "../services/course.service.ts";

export const getCourses = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await courseService.getAllCourses();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};