import { requiredNoWhitespace, minLength, maxLength } from "./rules";

export const validationTaskTitle = [
  requiredNoWhitespace,
  minLength(2, "Минимальная длина текста 2 символа"),
  maxLength(64, "Максимальная длина текста 64 символа!"),
];
