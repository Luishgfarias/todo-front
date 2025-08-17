import type { 
  Task,
  FullTask,
  CreateTaskData, 
  UpdateTaskData, 
  ToggleTaskData,
  TasksResponse, 
  TaskSearchParams,
  DeleteMultipleTasksData 
} from "../schemas/tasks";
import { api } from "./axios";

// Interface do service
export interface TaskService {
  fetchTasks(params?: TaskSearchParams): Promise<TasksResponse>;
  getTaskById(id: number): Promise<FullTask>;
  addTask(data: CreateTaskData): Promise<Task>;
  updateTask(id: number, data: UpdateTaskData): Promise<Task>;
  toggleTask(id: number, data: ToggleTaskData): Promise<Task>;
  deleteTask(id: number): Promise<void>;
  deleteMultipleTasks(data: DeleteMultipleTasksData): Promise<void>;
}

// Implementação concreta usando cliente Axios
export const taskService: TaskService = {
  fetchTasks: async (params?: TaskSearchParams) => {
    const response = await api.get<TasksResponse>("/tarefas", { params });
    return response.data;
  },

  getTaskById: async (id: number) => {
    const response = await api.get<FullTask>(`/tarefas/${id}`);
    return response.data;
  },

  addTask: async (data: CreateTaskData) => {
    const response = await api.post<Task>("/tarefas", data);
    return response.data;
  },

  toggleTask: async (id: number, data: ToggleTaskData) => {
    const response = await api.patch<Task>(`/tarefas/${id}`, data);
    return response.data;
  },

  updateTask: async (id: number, data: UpdateTaskData) => {
    const response = await api.put<Task>(`/tarefas/${id}`, data);
    return response.data;
  },

  deleteTask: async (id: number) => {
    await api.delete(`/tarefas/${id}`);
  },

  deleteMultipleTasks: async (data: DeleteMultipleTasksData) => {
    await api.delete("/tarefas/apagar-varias", { data });
  },
};
