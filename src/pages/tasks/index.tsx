import { useEffect } from "react"
import { useTaskStore } from "../../store/taskStore"
import SearchBar from "../../components/searchBar"
import CardTask from "../../components/cardTask"
import Loading from "../../components/loading"
import { FaPlus, FaTrashAlt } from "react-icons/fa"
import Button from "../../components/button"
import Swal from "sweetalert2"
import Pagination from "../../components/pagination"
import { useNavigate } from "react-router-dom";
const TasksPage = () => {
    const { tasks, fetchTasks, selectedTasks, deleteMultipleTasks, currentPage, totalPages, searchTerm, isLoading } = useTaskStore()
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks({ pagina: 1, titulo: undefined })
    }, [])

    const handleDeleteSelectedTasks = () => {
        Swal.fire({
            title: 'Deletar tarefas?',
            text: `Tem certeza que deseja deletar ${selectedTasks.length} tarefas?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMultipleTasks(selectedTasks)
            }
        })
    }

    const handlePageChange = (page: number) => {
        fetchTasks({ pagina: page, titulo: searchTerm || undefined });
    }


    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <Button variant="success" className="w-10 h-10 flex items-center justify-center flex-shrink-0" onClick={() => navigate("/tarefas/nova")}>
                    <FaPlus />
                </Button>
                <SearchBar />
                {selectedTasks.length > 0 && (
                    <Button variant="danger" className="flex items-center justify-center gap-1 px-3 py-2 whitespace-nowrap" onClick={handleDeleteSelectedTasks}>
                        <span className="hidden sm:inline">Deletar</span>
                        <FaTrashAlt />
                    </Button>
                )}
            </div>
            {isLoading ? (
                <Loading message="Carregando tarefas..." />
            ) : (
                <>
                    {tasks.map((task) => (
                        <CardTask key={task.id} {...task} />
                    ))}
                    <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
                </>
            )}
        </div>
    )
}

export default TasksPage