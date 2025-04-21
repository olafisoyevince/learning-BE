// // middlewares/validate.ts
// import { NextFunction, Request, Response } from "express";
// import { ZodSchema } from "zod";

// export const validate =
//   (schema: ZodSchema) =>
//   (req: Request, res: Response, next: NextFunction) => {
//     const result = schema.safeParse(req.body);

//     if (!result.success) {
//       return res.status(422).json({
//         message: "Validation error",
//         errors: result.error.errors,
//         statusCode: 422,
//         success: false,
//       });
//     }

//     req.body = result.data; // use parsed data
//     next();
//   };
