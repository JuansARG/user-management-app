import * as yup from 'yup';

export const loginSchema = yup
    .object({
        email: yup
            .string()
            .required('The email is required')
            .email('The email is invalid'),
        password: yup
            .string()
            .required('The password is required')
            .test('password-validation', 'The password is invalid', value => {
                if (!value) return false;

                const hasMinLength = value.length >= 8;
                const hasUppercase = /[A-Z]/.test(value);
                const hasLowercase = /[a-z]/.test(value);
                const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

                return (
                    hasMinLength &&
                    hasUppercase &&
                    hasLowercase &&
                    hasSpecialChar
                );
            }),
    })
    .required();
