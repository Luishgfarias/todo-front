import type { Task } from "../schemas/tasks"
import { FaCheck, FaTrashAlt, FaUndo } from "react-icons/fa";
import { useTaskStore } from "../store/taskStore";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
const CardTask = (task: Task) => {
    const { taskByID, deleteTask, selectTask, selectedTasks, unselectTask, toggleTask } = useTaskStore();
    const navigate = useNavigate();

    const handleOpenTask = async () => {
        await taskByID(task.id);
        navigate(`/tarefas/${task.id}`);
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
    const handleDone = () => {
        toggleTask(task.id, !task.concluida);
    }
    const handleSelect = () => {
        const findTask = selectedTasks.find((taskSelected) => taskSelected === task.id);
        if (findTask) {
            unselectTask(task.id);
        } else {
            selectTask(task.id);
        }
    }

    const borderColor = () => {
        switch (task.urgencia) {
            case "PADRAO":
                return "border-gray-200";
            case "IMPORTANTE":
                return "border-yellow-500";
            case "URGENTE":
                return "border-orange-500";
            case "CRITICA":
                return "border-red-500";
        }
    }

    return (
        <div className={`flex justify-between items-center w-full p-3 bg-white border-2 rounded-lg hover:shadow-md transition-shadow ${borderColor()}`}>
            <input
                type="checkbox"
                checked={selectedTasks.includes(task.id)}
                className="cursor-pointer"
                onClick={handleSelect}
            />
            <button className="flex items-center gap-3 flex-1 cursor-pointer" onClick={handleOpenTask}>
                <div className="flex-1">
                    <h1 className="font-medium text-gray-800">{task.titulo}</h1>
                    <p className="text-sm text-gray-500">{new Date(task.dataParaConclusao).toLocaleDateString("pt-BR")}</p>
                </div>
            </button>
            <div className="flex gap-2 items-center">

                <button
                    onClick={handleDone}
                    className="p-2 text-green-500 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors"
                >
                    <FaCheck color={task.concluida ? "green" : "lightgray"} />
                </button>

                <button
                    onClick={handleDelete}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                >
                    <FaTrashAlt />
                </button>

            </div>
        </div>
    )
}

export default CardTask