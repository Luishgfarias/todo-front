import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterSchema } from "../../schemas/auth"
import Input from "../../components/input"
import Button from "../../components/button"
import { useAuthStore } from "../../store/authStore"
import { Link, useNavigate } from "react-router-dom"

const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema),
    })
    const { register: registerUser } = useAuthStore()
    const navigate = useNavigate()
    const handleRegister = (data: RegisterSchema) => {
        try {
            registerUser(data)
            navigate("/auth/login")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="flex flex-col gap-4 items-center justify-center">
            <h1 className="text-2xl text-gray-900">Entrar no sistema</h1>
            <form onSubmit={handleSubmit(handleRegister)} className="flex flex-col gap-4 w-full">
                <Input placeholder="Nome" {...register("nome")} error={errors.nome?.message} />
                <Input placeholder="Email" {...register("email")} error={errors.email?.message} />
                <Input placeholder="Senha" type="password" showPasswordToggle {...register("senha")} error={errors.senha?.message} />
                <Button type="submit">Cadastrar</Button>
            </form>
            <Link to="/auth/login" className="text-sm text-gray-900">Já tem uma conta? Faça login</Link>
        </div>
    )
}

export default RegisterPage