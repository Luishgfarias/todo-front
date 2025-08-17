import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import Button from './button'
import logo from '../assets/logo.svg'
import miniLogo from '../assets/mini-logo.svg'
import Swal from 'sweetalert2'

export function AppHeader() {
    const location = useLocation()
    const { isAuthenticated, logout } = useAuthStore()
    const navigate = useNavigate()
    const isTasksPage = location.pathname === '/'

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: 'Sair da aplicação?',
            text: 'Você será desconectado e precisará fazer login novamente.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Sim, sair!',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            logout();
        }
    }

    return (
        <>
            {isAuthenticated ? (
                <div className="flex items-center justify-between w-full">
                    <img src={logo} alt="logo" className="mb-4" />
                    <div className="flex gap-2">
                        {isTasksPage ? <Button variant="success" onClick={() => navigate("/perfil")}>Perfil</Button> : <Button onClick={() => navigate("/")}>Tarefas</Button>}
                        <Button variant="danger" onClick={handleLogout}>Sair</Button>
                    </div>
                </div>
            ) : (
                <img src={miniLogo} alt="logo" className="w-10 h-10 mb-4" />
            )}
        </>
    )
}
