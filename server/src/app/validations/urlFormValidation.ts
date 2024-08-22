
import { urlGenerateformSchema } from "../schemas/urlSchema";
import { GenerateUrlFormState } from "../types/url";
import { createValidator } from "./createValidator";

export const validateGenerateUrlForm = createValidator<GenerateUrlFormState>(urlGenerateformSchema);
