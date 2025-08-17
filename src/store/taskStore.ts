import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  CreateTaskData,
  FullTask,
  Task,
  TaskSearchParams,
  UpdateTaskData,
} from "../schemas/tasks";
import { taskService } from "../lib/taskService";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

interface TaskState {
  tasks: Task[];
  currentPage: number;
  totalPages: number;
  totalTasks: number;
  searchTerm: string;
  isLoading: boolean;
  task: FullTask | null;
  selectedTasks: number[];
  // Actions
  fetchTasks: (params?: TaskSearchParams) => Promise<void>;
  addTask: (data: CreateTaskData) => Promise<void>;
  updateTask: (id: number, data: UpdateTaskData) => Promise<void>;
  toggleTask: (id: number, concluida: boolean) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  deleteMultipleTasks: (ids: number[]) => Promise<void>;
  taskByID: (id: number) => Promise<void>;
  selectTask: (id: number) => void;
  unselectTask: (id: number) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
  tasks: [],
  selectedTasks: [],
  currentPage: 1,
  totalPages: 1,
  totalTasks: 0,
  searchTerm: "",
  isLoading: false,
  task: null,
  fetchTasks: async (params?: TaskSearchParams) => {
    // Se já temos dados persistidos e não mudaram os parâmetros, não faz nova requisição
    const currentState = get();
    const hasData = currentState.tasks.length > 0;
    const sameSearch = currentState.searchTerm === (params?.titulo || "");
    const samePage = currentState.currentPage === (params?.pagina || 1);
    
    if (hasData && sameSearch && samePage) {
      return; // Evita requisição desnecessária
    }

    set({ isLoading: true });
    try {
      const response = await taskService.fetchTasks(params);
      set({
        tasks: response.tarefas,
        currentPage: response.paginaAtual,
        totalPages: response.totalDePaginas,
        totalTasks: response.totalDeTarefas,
        searchTerm: params?.titulo || "",
      });
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      toast.error(
        error instanceof AxiosError
          ? error.response?.data
          : "Erro ao buscar tarefas"
      );
    } finally {
      set({ isLoading: false });
    }
  },

  taskByID: async (id: number) => {
    try {
      const response = await taskService.getTaskById(id);
      set({ task: response });
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data
          : "Erro ao buscar tarefa"
      );
      console.error("Erro ao buscar tarefa:", error);
    }
  },

  addTask: async (data: CreateTaskData) => {
    try {
      const response = await taskService.addTask(data);
      set({ tasks: [...get().tasks, response] });
      toast.success("Tarefa adicionada com sucesso");
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data
          : "Erro ao adicionar tarefa"
      );
      console.error("Erro ao adicionar tarefa:", error);
    }
  },

  updateTask: async (id: number, data: UpdateTaskData) => {
    try {
      const response = await taskService.updateTask(id, data);
      set({
        tasks: get().tasks.map((task) => (task.id === id ? response : task)),
      });
      toast.success("Tarefa atualizada com sucesso");
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data
          : "Erro ao atualizar tarefa"
      );
      console.error("Erro ao atualizar tarefa:", error);
    }
  },

  toggleTask: async (id: number, concluida: boolean) => {
    try {
      const response = await taskService.toggleTask(id, { concluida });
      set({
        tasks: get().tasks.map((task) => (task.id === id ? response : task)),
      });
      toast.success(
        `Tarefa ${concluida ? "concluída" : "reaberta"} com sucesso`
      );
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data
          : "Erro ao alternar conclusão da tarefa"
      );
      console.error("Erro ao alternar conclusão da tarefa:", error);
    }
  },

  deleteTask: async (id: number) => {
    try {
      await taskService.deleteTask(id);
      set({ tasks: get().tasks.filter((task) => task.id !== id) });
      toast.success("Tarefa deletada com sucesso");
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data
          : "Erro ao deletar tarefa"
      );
      console.error("Erro ao deletar tarefa:", error);
    }
  },

  selectTask: (id: number) => {
    set({ selectedTasks: [...get().selectedTasks, id] });
  },

  unselectTask: (id: number) => {
    set({ selectedTasks: get().selectedTasks.filter((task) => task !== id) });
  },

  deleteMultipleTasks: async (ids: number[]) => {
    try {
      await taskService.deleteMultipleTasks({ ids });
      set({ tasks: get().tasks.filter((task) => !ids.includes(task.id)) });
      set({ selectedTasks: [] });
      toast.success("Tarefas deletadas com sucesso");
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data
          : "Erro ao deletar múltiplas tarefas"
      );
      console.error("Erro ao deletar múltiplas tarefas:", error);
    }
  },
}),
    {
      name: "task-storage", // Nome da chave no localStorage
      partialize: (state) => ({
        tasks: state.tasks,
        currentPage: state.currentPage,
        totalPages: state.totalPages,
        totalTasks: state.totalTasks,
        searchTerm: state.searchTerm,
        // Não persiste: isLoading, task, selectedTasks
      }),
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          if (!item) return null;
          
          try {
            const parsed = JSON.parse(item);
            const now = Date.now();
            const tenMinutes = 10 * 60 * 1000; // 10 minutos em ms
            
            // Se passou de 10 minutos, remove do localStorage
            if (parsed.state?.timestamp && (now - parsed.state.timestamp) > tenMinutes) {
              localStorage.removeItem(name);
              return null;
            }
            
            return parsed;
          } catch {
            return null;
          }
        },
        setItem: (name, value) => {
          const dataWithTimestamp = {
            ...value,
            state: {
              ...value.state,
              timestamp: Date.now()
            }
          };
          localStorage.setItem(name, JSON.stringify(dataWithTimestamp));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
