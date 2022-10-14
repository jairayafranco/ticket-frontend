import { Routes, Route, Navigate } from 'react-router-dom'
import { ContextProvider } from '../context/Context'
import { RouteConfig } from '../interfaces/routes/routerInterface'
import Login from '../views/Login'

const Router: React.FC<RouteConfig> = () => {
    const routes: RouteConfig[] = [
        {
            path: '/',
            element: <Login />,
        },
        {
            path: '/dashboard',
            // element: <Dashboard />,
        },
        {
            path: '*',
            element: <Navigate to="/" />,
        },
    ];

    return (
        <ContextProvider>
            <Routes>
                {
                    routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={route.element}
                            children={route.children?.map((child, index) => (
                                <Route
                                    key={index}
                                    path={child.path}
                                    element={child.element}
                                />
                            ))}
                        />
                    ))
                }
            </Routes>
        </ContextProvider>
    );
}

export default Router;