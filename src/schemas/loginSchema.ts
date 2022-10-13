import * as yup from 'yup';

const loginSchema = yup.object({
    email: yup.string().email("Ingrese un correo valido").required("El correo es requerido"),
    password: yup.string().required("La contraseña es requerida"),
});

export default loginSchema;