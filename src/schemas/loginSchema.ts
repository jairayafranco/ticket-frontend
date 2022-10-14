import * as yup from 'yup';

const loginSchema = yup.object({
    username: yup.string(),
    password: yup.string().required("La contraseña es requerida"),
});

export default loginSchema;