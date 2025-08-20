import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterSchema } from "../../schemas/auth"
import { userService } from "../../services/userService"
import Input from "../../components/input"
import Button from "../../components/button"
import Loading from "../../components/loading"
import { Link, useNavigate } from "react-router-dom"

const RegisterPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema),
    })
    const navigate = useNavigate()
    
    const handleRegister = async (data: RegisterSchema) => {
        setIsLoading(true)
        try {
            await userService.register(data)
            navigate("/auth/login")
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4 items-center justify-center">
                <Loading message="Criando conta..." />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4 items-center justify-center">
            <h1 className="text-2xl text-gray-900">Criar conta</h1>
            <form onSubmit={handleSubmit(handleRegister)} className="flex flex-col gap-4 w-full">
                <Input placeholder="Nome" {...register("nome")} error={errors.nome?.message} />
                <Input placeholder="Email" {...register("email")} error={errors.email?.message} />
                <Input placeholder="Senha" type="password" showPasswordToggle {...register("senha")} error={errors.senha?.message} />
                <Button type="submit" disabled={isLoading}>Cadastrar</Button>
            </form>
            <Link to="/auth/login" className="text-sm text-gray-900">Já tem uma conta? Faça login</Link>
        </div>
    )
}

export default RegisterPage