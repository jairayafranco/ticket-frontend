import * as yup from 'yup';

export const loginSchema = yup.object({
    username: yup.string(),
    password: yup.string().required("La contraseña es requerida"),
});