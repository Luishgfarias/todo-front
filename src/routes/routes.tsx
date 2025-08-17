// routes/AppRoutes.tsx
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { Layout } from '../components/Layout'
import LoginPage from '../pages/auth/login'
import RegisterPage from '../pages/auth/register'
import TasksPage from '../pages/tasks'
import ProfilePage from '../pages/profile'
import TaskDetails from '../pages/tasks/taskDetails'
import TaskFormPage from '../pages/tasks/taskForm'

// Componente de rota proteção de rotas
function RouteGuard({ isPrivate = false }) {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated)

    if (isPrivate && !isAuthenticated) {
        return <Navigate to="/auth/login" />
    }

    if (!isPrivate && isAuthenticated) {
        return <Navigate to="/" />
    }

    return <Layout><Outlet /></Layout>
}

// Componente principal de rotas
export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<RouteGuard isPrivate={false} />}>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                </Route>
                <Route path="/" element={<RouteGuard isPrivate={true} />}>
                    <Route index element={<TasksPage />} />
                    <Route path="perfil" element={<ProfilePage />} />
                    <Route path="tarefas/:id" element={<TaskDetails />} />
                    <Route path="tarefas/nova" element={<TaskFormPage />} />
                    <Route path="tarefas/:id/editar" element={<TaskFormPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}