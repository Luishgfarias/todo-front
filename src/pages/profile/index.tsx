import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../../store/authStore";
import { updateUserSchema, type UpdateUserSchema } from "../../schemas/auth";
import Button from "../../components/button";
import Input from "../../components/input";
import Loading from "../../components/loading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { user, updateMe, deleteMe, isLoadingProfile } = useAuthStore();
    const navigate = useNavigate();
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(updateUserSchema)
    });



    useEffect(() => {
        if (user && isEditing) {
            reset({
                nome: user.nome,
                email: user.email,
                senha: ""
            });
        }
    }, [user, isEditing, reset]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        reset();
    };

    const onSubmit = async (data: UpdateUserSchema) => {
        const updateData = Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value && value.trim() !== "")
        ) as UpdateUserSchema;
        
        await updateMe(updateData);
        setIsEditing(false);
    };

    const handleDeleteAccount = async () => {
        const result = await Swal.fire({
            title: 'Deletar conta?',
            text: 'Esta ação é irreversível. Todos os seus dados serão perdidos.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Sim, deletar conta!',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            await deleteMe();
            navigate("/auth/login");
        }
    };

    if (!user) {
        return (
            <div className="flex flex-col gap-4 w-full">
                <Loading message="Carregando perfil..." />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 w-full">
            <h1 className="text-2xl font-bold">
                {isEditing ? "Editar Perfil" : "Meu Perfil"}
            </h1>
            
            {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nome
                        </label>
                        <Input
                            {...register("nome")}
                            placeholder="Digite seu nome"
                            error={errors.nome?.message}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <Input
                            {...register("email")}
                            placeholder="Digite seu email"
                            type="email"
                            error={errors.email?.message}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nova Senha (deixe em branco para manter a atual)
                        </label>
                        <Input
                            {...register("senha")}
                            placeholder="Digite uma nova senha"
                            type="password"
                            showPasswordToggle
                            error={errors.senha?.message}
                        />
                    </div>

                    <div className="flex justify-between gap-4 mt-4">
                        <Button type="button" onClick={handleCancel} className="w-1/3" disabled={isLoadingProfile}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="success" className="w-2/3" disabled={isLoadingProfile}>
                            {isLoadingProfile ? "Salvando..." : "Salvar Alterações"}
                        </Button>
                    </div>
                </form>
            ) : (
                <div className="flex flex-col gap-4">
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <div className="flex flex-col gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nome
                                </label>
                                <p className="text-gray-900 font-medium">{user.nome}</p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <p className="text-gray-900">{user.email}</p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    ID do Usuário
                                </label>
                                <p className="text-gray-500 text-sm font-mono">{user.id}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between gap-4">
                        <Button 
                            variant="danger" 
                            onClick={handleDeleteAccount} 
                            className="w-1/3"
                            disabled={isLoadingProfile}
                        >
                            Deletar Conta
                        </Button>
                        <Button 
                            variant="success" 
                            onClick={handleEdit} 
                            className="w-2/3"
                            disabled={isLoadingProfile}
                        >
                            Editar Perfil
                        </Button>
                    </div>
                </div>
            )}
            
            {isLoadingProfile && (
                <div className="mt-4">
                    <Loading message="Processando..." />
                </div>
            )}
        </div>
    );
};

export default ProfilePage;