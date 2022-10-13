import { Routes, Route, Navigate } from 'react-router-dom'
import { ContextProvider } from '../context/Context'
import Login from '../views/Login'

export interface RouteConfig {
    path?: string
    element?: React.ReactNode
    children?: [{
        path: string
        element: React.ReactNode
    }]
}

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