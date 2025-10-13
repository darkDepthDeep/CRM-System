export const validationTaskTitle = [
          { required: true, message: 'Это поле не может быть пустым!' },
          { whitespace: true, message: 'Это поле не может быть пустым!' },
          { min: 2, message: "Минимальная длина текста ${min} символа", transform: (value: string): string => value.trim() },
          { max: 64, message: 'Максимальная длина текста ${max} символа!', transform: (value: string): string => value.trim()}
        ]