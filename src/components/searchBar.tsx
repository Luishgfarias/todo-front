import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import Input from "./input"
import Button from "./button"
import { taskSearchParamsSchema, type TaskSearchParams } from "../schemas/tasks"
import { useTaskStore } from "../store/taskStore"
import { FaSearch } from "react-icons/fa"

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
            <Input placeholder="Pesquisar" className="flex-1" {...register("titulo")} />
            <Button type="submit" className="px-3 py-2 text-sm md:px-4 md:text-base whitespace-nowrap">
                <span className="hidden sm:inline">Pesquisar</span>
                <span className="sm:hidden">
                    <FaSearch />
                </span>
            </Button>
        </form>
    )
}

export default SearchBar