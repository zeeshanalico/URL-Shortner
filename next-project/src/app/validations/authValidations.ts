import { signupSchema, signinSchema } from "../schemas/authSchema";
import { SignupI, SigninI } from "../types/authTypes";
import { createValidator } from "./createValidator";

export const validateSignin = createValidator<SigninI>(signinSchema)
export const validateSignup = createValidator<SignupI>(signupSchema)

// export const validateSignup = (userData: SignupI) => {
  
//   const validationResult = signupSchema.safeParse(userData);
//   if (!validationResult.success) {
//     const errorMessage = validationResult.error.errors.map((error, index) => {
//       if (index === 0)
//         return `${error.message}`
//     });
//     console.log(errorMessage);
    
//     throw new Error(errorMessage.join(' '));
//   }
//   return validationResult.data;
// };

// export const validateSignin = (userData: SigninI) => {
//   const validationResult = signinSchema.safeParse(userData);
//   if (!validationResult.success) {
//     console.log(validationResult.error.errors)
//     const errorMessages = validationResult.error.errors.map((error, index) => {
//       if (index === 0)
//         // ${error.path[0]}:
//         return `${error.message}`
//     });
//     throw new Error(errorMessages.join(' '));
//   }
//   return validationResult.data;
// };
