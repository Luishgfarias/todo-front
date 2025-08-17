import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTaskStore } from "../../store/taskStore"
import { createTaskSchema, updateTaskSchema, type CreateTaskData, type UpdateTaskData } from "../../schemas/tasks"
import Button from "../../components/button"
import Input from "../../components/input"

const TaskFormPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { task, addTask, updateTask } = useTaskStore()
    
    const isEditing = !!id
    const schema = isEditing ? updateTaskSchema : createTaskSchema
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schema)
    })

    useEffect(() => {
        if (isEditing && task) {
            // Converte ISO string para formato YYYY-MM-DD do input date
            const dateForInput = task.dataParaConclusao 
                ? new Date(task.dataParaConclusao).toISOString().split('T')[0]
                : '';
                
            reset({
                titulo: task.titulo,
                descricao: task.descricao,
                dataParaConclusao: dateForInput,
                urgencia: task.urgencia
            })
        }
    }, [task, isEditing, reset])

    const onSubmit = async (data: CreateTaskData | UpdateTaskData) => {
        try {
            if (isEditing && id) {
                await updateTask(Number(id), data as UpdateTaskData)
            } else {
                await addTask(data as CreateTaskData)
            }
            navigate("/")
        } catch (error) {
            // Erro já tratado no store
        }
    }

    const handleBack = () => {
        navigate("/")
    }

    return (
        <div className="flex flex-col gap-4 w-full">
            <h1 className="text-2xl font-bold">
                {isEditing ? "Editar Tarefa" : "Nova Tarefa"}
            </h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Título
                    </label>
                    <Input
                        {...register("titulo")}
                        placeholder="Digite o título da tarefa"
                        error={errors.titulo?.message}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descrição
                    </label>
                    <textarea
                        {...register("descricao")}
                        placeholder="Digite a descrição da tarefa"
                        className="w-full p-2 rounded-md border border-gray-300 bg-gray-100 min-h-24 resize-vertical"
                    />
                    {errors.descricao && (
                        <p className="text-red-500 text-sm mt-1">{errors.descricao.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Data para Conclusão
                    </label>
                    <Input
                        {...register("dataParaConclusao")}
                        type="date"
                        error={errors.dataParaConclusao?.message}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Urgência
                    </label>
                    <select
                        {...register("urgencia")}
                        className="w-full p-2 rounded-md border border-gray-300 bg-gray-100"
                    >
                        <option value="PADRAO">Padrão</option>
                        <option value="IMPORTANTE">Importante</option>
                        <option value="URGENTE">Urgente</option>
                        <option value="CRITICA">Crítica</option>
                    </select>
                    {errors.urgencia && (
                        <p className="text-red-500 text-sm mt-1">{errors.urgencia.message}</p>
                    )}
                </div>

                <div className="flex justify-between gap-4 mt-4">
                    <Button type="button" onClick={handleBack} className="w-1/3">
                        Cancelar
                    </Button>
                    <Button type="submit" variant="success" className="w-2/3">
                        {isEditing ? "Atualizar Tarefa" : "Criar Tarefa"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default TaskFormPage
