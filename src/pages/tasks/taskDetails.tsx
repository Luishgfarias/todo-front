import { useTaskStore } from "../../store/taskStore";
import Button from "../../components/button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const TaskDetails = () => {
    const { task, deleteTask } = useTaskStore();
    const navigate = useNavigate();

    if (!task) {
        return <div>Tarefa não encontrada</div>;
    }

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: 'Deletar tarefa?',
            text: `Tem certeza que deseja deletar "${task.titulo}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Cancelar'
        });
        if (result.isConfirmed) {
            deleteTask(task.id);
        }
    }
    const handleEdit = () => {
        navigate(`/tarefas/${task.id}/editar`);
    }
    const handleBack = () => {
        navigate("/");
    }

    return (
        <div className="flex flex-col gap-4 w-full">
            <h1 className="text-2xl font-bold">{task.titulo}</h1>
            <p className="text-sm text-gray-500 break-words whitespace-pre-wrap max-w-none">{task.descricao}</p>
            <p className="text-sm text-gray-500">Data de criação: {task.dataDeCriacao ? new Date(task.dataDeCriacao).toLocaleDateString("pt-BR") : "Não informado"}</p>
            <p className="text-sm text-gray-500">Data para conclusão: {task.dataParaConclusao ? new Date(task.dataParaConclusao).toLocaleDateString("pt-BR") : "Não informado"}</p>
            <p className="text-sm text-gray-500">Urgência: {task.urgencia}</p>
            <p className="text-sm text-gray-500">Concluída: {task.concluida ? "Sim" : "Não"}</p>
            <div className="flex justify-between">
                <Button className="w-1/4" onClick={handleBack}>Voltar</Button>
                <div className="flex gap-2 w-1/2">
                    <Button variant="success" className="w-1/2" onClick={handleEdit}>Editar</Button>
                    <Button variant="danger" className="w-1/2" onClick={handleDelete}>Deletar</Button>
                </div>
            </div>
        </div>
    )
}

export default TaskDetails;