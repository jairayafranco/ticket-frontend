export interface RouteConfig {
    path?: string
    element?: React.ReactNode
    children?: [{
        path: string
        element: React.ReactNode
    }]
}