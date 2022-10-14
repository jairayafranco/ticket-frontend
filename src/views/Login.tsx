import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import { loginSchema } from '../schemas/schemas';
import { useState } from 'react';
import { AxiosResponse } from 'axios';
import api from '../services/api';
import LoadingButton from '@mui/lab/LoadingButton';
import Snackbar from '@mui/material/Snackbar';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function Login() {
    const [loading, setLoading] = useState<boolean>(false);
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: async ({ username, password }) => {
            setLoading(true);
            try {
                const { data: { token } } = await api.post<AxiosResponse<{ token: string }>>('/auth/login', {
                    username,
                    password
                });
                setShowSnackbar(true);
            } catch (error) {
                console.log("error: ", error);
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Nombre del chuzo
                        </Typography>
                        <form onSubmit={formik.handleSubmit} style={{ marginTop: 1 }}>
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Nombre de usuario"
                                name="username"
                                autoComplete="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Contraseña"
                                name="password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <LoadingButton
                                fullWidth
                                type="submit"
                                loading={loading}
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Iniciar Sesión
                            </LoadingButton>
                            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
                                {'Copyright © '}
                                <Link color="inherit" href="https://mui.com/">
                                    ChuzoSoft
                                </Link>{' '}
                                {new Date().getFullYear()}
                                {'.'}
                            </Typography>
                        </form>
                    </Box>
                </Grid>
            </Grid>
            <Snackbar
                open={showSnackbar}
                autoHideDuration={1000}
                onClose={() => setShowSnackbar(false)}
                message="Usuario registrado correctamente"
            />
        </ThemeProvider>
    );
}