import {
  requiredNoWhitespace,
  minLength,
  maxLength,
  latinLettersOnly,
  lettersOnly,
  noWhitespace,
  emailRule,
  phoneRule,
} from "./rules";

export const validationUserName = [
  requiredNoWhitespace,
  lettersOnly,
  minLength(1),
  maxLength(60),
];

export const validationLogin = [
  requiredNoWhitespace,
  latinLettersOnly,
  minLength(2),
  maxLength(60),
];

export const validationPassword = [
  requiredNoWhitespace,
  noWhitespace,
  minLength(6, "Минимальная длина пароля 6 символов"),
  maxLength(60, "Максимальная длина пароля 60 символов!"),
];

export const validationConfirmPassword = [
  requiredNoWhitespace,
  ({ getFieldValue }: { getFieldValue: (name: string) => string }) => ({
    validator(_: unknown, value: string) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Пароли не совпадают!"));
    },
  }),
];

export const validationEmail = [
  {
    required: true,
    message: "Это поле не может быть пустым!",
    transform: (value: string) => value.trim(),
  },
  emailRule,
];

export const validationPhone = [{ required: false }, phoneRule];
