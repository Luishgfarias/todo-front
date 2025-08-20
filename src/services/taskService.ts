import { toast } from "react-hot-toast";
import { taskService } from "../lib/taskService";
import { handleServiceError } from "../lib/errorHandler";
import type {
  CreateTaskData,
  FullTask,
  Task,
  TaskSearchParams,
  UpdateTaskData,
} from "../schemas/tasks";

interface TasksResponse {
  tarefas: Task[];
  paginaAtual: number;
  totalDePaginas: number;
  totalDeTarefas: number;
}

export const taskServiceStore = {
  async fetchTasks(params?: TaskSearchParams): Promise<TasksResponse> {
    try {
      return await taskService.fetchTasks(params);
    } catch (error) {
      handleServiceError(error, "Erro ao buscar tarefas");
      throw error;
    }
  },

  async getTaskById(id: number): Promise<FullTask> {
    try {
      return await taskService.getTaskById(id);
    } catch (error) {
      handleServiceError(error, "Erro ao buscar tarefa");
      throw error;
    }
  },

  async addTask(data: CreateTaskData): Promise<Task> {
    try {
      const response = await taskService.addTask(data);
      toast.success("Tarefa adicionada com sucesso");
      return response;
    } catch (error) {
      handleServiceError(error, "Erro ao adicionar tarefa");
      throw error;
    }
  },

  async updateTask(id: number, data: UpdateTaskData): Promise<Task> {
    try {
      const response = await taskService.updateTask(id, data);
      toast.success("Tarefa atualizada com sucesso");
      return response;
    } catch (error) {
      handleServiceError(error, "Erro ao atualizar tarefa");
      throw error;
    }
  },

  async toggleTask(id: number, concluida: boolean): Promise<Task> {
    try {
      const response = await taskService.toggleTask(id, { concluida });
      toast.success(
        `Tarefa ${concluida ? "concluída" : "reaberta"} com sucesso`
      );
      return response;
    } catch (error) {
      handleServiceError(error, "Erro ao alternar conclusão da tarefa");
      throw error;
    }
  },

  async deleteTask(id: number): Promise<void> {
    try {
      await taskService.deleteTask(id);
      toast.success("Tarefa deletada com sucesso");
    } catch (error) {
      handleServiceError(error, "Erro ao deletar tarefa");
      throw error;
    }
  },

  async deleteMultipleTasks(ids: number[]): Promise<void> {
    try {
      await taskService.deleteMultipleTasks({ ids });
      toast.success("Tarefas deletadas com sucesso");
    } catch (error) {
      handleServiceError(error, "Erro ao deletar múltiplas tarefas");
      throw error;
    }
  }
};
