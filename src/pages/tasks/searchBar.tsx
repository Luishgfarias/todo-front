import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Input from "../../components/input"
import Button from "../../components/button"
import { taskSearchParamsSchema, type TaskSearchParams } from "../../schemas/tasks"
import { useTaskStore } from "../../store/taskStore"

const SearchBar = () => {
    const { register, handleSubmit } = useForm({
        resolver: zodResolver(taskSearchParamsSchema)
    })
    const { fetchTasks } = useTaskStore()

    const onSubmit = (data: TaskSearchParams) => {
        fetchTasks({ ...data, pagina: 1 })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 w-full">
            <Input placeholder="Pesquisar" className="w-full" {...register("titulo")} />
            <Button type="submit" className="w-1/4">Pesquisar</Button>
            
        </form>
    )
}

export default SearchBar