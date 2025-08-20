import { create } from "zustand";
import { persist } from "zustand/middleware";
import { taskServiceStore } from "../services/taskService";
import type {
  CreateTaskData,
  FullTask,
  Task,
  TaskSearchParams,
  UpdateTaskData,
} from "../schemas/tasks";

interface TaskState {
  tasks: Task[];
  currentPage: number;
  totalPages: number;
  totalTasks: number;
  searchTerm: string;
  isLoading: boolean;
  isLoadingOperation: boolean;
  loadingTaskId: number | null;
  task: FullTask | null;
  selectedTasks: number[];
  fetchTasks: (params?: TaskSearchParams) => Promise<void>;
  addTask: (data: CreateTaskData) => Promise<void>;
  updateTask: (id: number, data: UpdateTaskData) => Promise<void>;
  toggleTask: (id: number, concluida: boolean) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  deleteMultipleTasks: (ids: number[]) => Promise<void>;
  taskByID: (id: number) => Promise<void>;
  selectTask: (id: number) => void;
  unselectTask: (id: number) => void;
  clearStore: () => void;
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
  isLoadingOperation: false,
  loadingTaskId: null,
  task: null,
  fetchTasks: async (params?: TaskSearchParams) => {
    const currentState = get();
    const hasData = currentState.tasks.length > 0;
    const sameSearch = currentState.searchTerm === (params?.titulo || "");
    const samePage = currentState.currentPage === (params?.pagina || 1);
    
    if (hasData && sameSearch && samePage) {
      return;
    }

    set({ isLoading: true });
    try {
      const response = await taskServiceStore.fetchTasks(params);
      set({
        tasks: response.tarefas,
        currentPage: response.paginaAtual,
        totalPages: response.totalDePaginas,
        totalTasks: response.totalDeTarefas,
        searchTerm: params?.titulo || "",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  taskByID: async (id: number) => {
    set({ loadingTaskId: id });
    try {
      const response = await taskServiceStore.getTaskById(id);
      set({ task: response });
    } finally {
      set({ loadingTaskId: null });
    }
  },

  addTask: async (data: CreateTaskData) => {
    set({ isLoadingOperation: true });
    try {
      const response = await taskServiceStore.addTask(data);
      set({ tasks: [...get().tasks, response] });
    } finally {
      set({ isLoadingOperation: false });
    }
  },

  updateTask: async (id: number, data: UpdateTaskData) => {
    set({ isLoadingOperation: true });
    try {
      const response = await taskServiceStore.updateTask(id, data);
      set({
        tasks: get().tasks.map((task) => (task.id === id ? response : task)),
      });
    } finally {
      set({ isLoadingOperation: false });
    }
  },

  toggleTask: async (id: number, concluida: boolean) => {
    const response = await taskServiceStore.toggleTask(id, concluida);
    set({
      tasks: get().tasks.map((task) => (task.id === id ? response : task)),
    });
  },

  deleteTask: async (id: number) => {
    await taskServiceStore.deleteTask(id);
    set({ tasks: get().tasks.filter((task) => task.id !== id) });
  },

  selectTask: (id: number) => {
    set({ selectedTasks: [...get().selectedTasks, id] });
  },

  unselectTask: (id: number) => {
    set({ selectedTasks: get().selectedTasks.filter((task) => task !== id) });
  },

  deleteMultipleTasks: async (ids: number[]) => {
    await taskServiceStore.deleteMultipleTasks(ids);
    set({ tasks: get().tasks.filter((task) => !ids.includes(task.id)) });
    set({ selectedTasks: [] });
  },

  clearStore: () => {
    set({
      tasks: [],
      selectedTasks: [],
      currentPage: 1,
      totalPages: 1,
      totalTasks: 0,
      searchTerm: "",
      isLoading: false,
      isLoadingOperation: false,
      loadingTaskId: null,
      task: null,
    });
  },
}),
    {
      name: "task-storage",
      partialize: (state) => ({
        tasks: state.tasks,
        currentPage: state.currentPage,
        totalPages: state.totalPages,
        totalTasks: state.totalTasks,
        searchTerm: state.searchTerm,
      }),
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          if (!item) return null;
          
          try {
            const parsed = JSON.parse(item);
            const now = Date.now();
            const tenMinutes = 10 * 60 * 1000;
            
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
