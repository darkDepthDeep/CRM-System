export const validationTaskTitle = [
          { required: true, message: 'Это поле не может быть пустым!' },
          { whitespace: true, message: 'Это поле не может быть пустым!' },
          { min: 2, message: 'Минимальная длина текста ${min} символа', transform: (value: string): string => value.trim() },
          { max: 64, message: 'Максимальная длина текста ${max} символа!', transform: (value: string): string => value.trim()}
        ]

// ВАЛИДАЦИЯ РЕГИСТРАЦИИ=============================================================================================================
export const validationUserName = [
          { required: true, message: 'Это поле не может быть пустым!' },
          { pattern: /^[a-zA-Zа-яА-ЯёЁ]+$/, message: 'Можно использовать только буквы русского и латинского алфавита и без пробелов!' },
          { min: 1, message: 'Минимальная длина текста ${min} символа', transform: (value: string): string => value.trim() },
          { max: 60, message: 'Максимальная длина текста ${max} символов!', transform: (value: string): string => value.trim() }
]

export const valiadtionLogin = [
          { required: true, message: 'Это поле не может быть пустым!'  },
          { pattern: /^[a-zA-Z]+$/, message: 'Можно использовать только буквы латинского алфавита и без пробелов!' },
          { min: 2, message: 'Минимальная длина текста ${min} символа', transform: (value: string): string => value.trim() },
          { max: 60, message: 'Максимальная длина текста ${max} символов!', transform: (value: string): string => value.trim() }
]

export const validationPassword = [
          { required: true, message: 'Это поле не может быть пустым!'  },
          { pattern: /^\S*$/, message: 'Пробелы запрещены!' },
          { whitespace: true, message: 'Это поле не может быть пустым!' },
          { min: 6, message: 'Минимальная длина пароля ${min} символов', transform: (value: string): string => value.trim() },
          { max: 60, message: 'Максимальная длина пароля ${max} символов!', transform: (value: string): string => value.trim() }
]

export const validationConfirmPassword = [
          { required: true, message: 'Это поле не может быть пустым!'},
          { whitespace: true, message: 'Это поле не может быть пустым!' },
          ({ getFieldValue }: { getFieldValue: (name: string) => string }) => ({
            validator(_: unknown, value: string) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Пароли не совпадают!'));
            },
          }),
]

export const validationEmail = [
          { required: true, message: 'Это поле не может быть пустым!', transform: (value: string): string => value.trim() },
          { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Введите корректный email адрес!' }
]

export const validationPhone = [
          { required: false },
          { pattern: /^(\+7|8)?[0-9]{10}$/, message: 'Введите 10 цифр номера после +7 или 8' }
]