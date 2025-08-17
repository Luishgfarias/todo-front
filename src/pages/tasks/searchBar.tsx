import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import Input from "../../components/input"
import Button from "../../components/button"
import { taskSearchParamsSchema, type TaskSearchParams } from "../../schemas/tasks"
import { useTaskStore } from "../../store/taskStore"

const SearchBar = () => {
    const { register, handleSubmit, watch } = useForm({
        resolver: zodResolver(taskSearchParamsSchema)
    })
    const { fetchTasks } = useTaskStore()
    
    const searchValue = watch("titulo")

    // Busca automaticamente quando o campo fica vazio
    useEffect(() => {
        if (searchValue === "") {
            fetchTasks({ pagina: 1, titulo: undefined })
        }
    }, [searchValue, fetchTasks])

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