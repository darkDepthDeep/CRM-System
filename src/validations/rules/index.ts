export const requiredNoWhitespace = {
  required: true,
  whitespace: true,
  message: "Это поле не может быть пустым!",
};

export const minLength = (min: number, message?: string) => ({
  min,
  message:
    message ||
    `Минимальная длина текста ${min} символ${
      min === 1 ? "" : min < 5 ? "а" : "ов"
    }`,
  transform: (value: string) => value.trim(),
});

export const maxLength = (max: number, message?: string) => ({
  max,
  message:
    message ||
    `Максимальная длина текста ${max} символ${
      max === 1 ? "" : max < 5 ? "а" : "ов"
    }!`,
  transform: (value: string) => value.trim(),
});

export const latinLettersOnly = {
  pattern: /^[a-zA-Z]+$/,
  message:
    "Можно использовать только буквы латинского алфавита и без пробелов!",
};

export const lettersOnly = {
  pattern: /^[a-zA-Zа-яА-ЯёЁ]+$/,
  message:
    "Можно использовать только буквы русского и латинского алфавита и без пробелов!",
};

export const emailRule = {
  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  message: "Введите корректный email адрес!",
};

export const noWhitespace = {
  pattern: /^\S*$/,
  message: "Пробелы запрещены!",
};

export const phoneRule = {
  pattern: /^(\+7|8)?9[0-9]{9}$/,
  message: "Введите корректный номер (например, +79991234567)",
};
