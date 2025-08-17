import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginSchema } from "../../schemas/auth"
import Input from "../../components/input"
import Button from "../../components/button"
import { useAuthStore } from "../../store/authStore"
import { Link } from "react-router-dom"

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
    })
    const { login } = useAuthStore()

    const handleLogin = (data: LoginSchema) => {
        login(data)
    }

    return (
        <div className="flex flex-col gap-4 items-center justify-center">
            <h1 className="text-2xl text-gray-900">Entrar no sistema</h1>
            <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-4 w-full">
                <Input placeholder="Email" {...register("email")} error={errors.email?.message} />
                <Input placeholder="Senha" type="password" showPasswordToggle {...register("senha")} error={errors.senha?.message} />
                <Button type="submit">Entrar</Button>
            </form>
            <Link to="/auth/register" className="text-sm text-gray-900">Não tem uma conta? Cadastre-se</Link>
        </div>
    )
}

export default LoginPage