import { z } from "zod";

// Schema da tarefa individual
export const taskSchema = z.object({
  id: z.number(),
  titulo: z.string().min(1, "Título é obrigatório"),
  concluida: z.boolean(),
  urgencia: z.enum(["PADRAO", "IMPORTANTE", "URGENTE", "CRITICA"]),
  dataParaConclusao: z.coerce.string(),
});
export const fullTaskSchema = z.object({
  id: z.number(),
  titulo: z.string().min(1, "Título é obrigatório"),
  concluida: z.boolean(),
  urgencia: z.enum(["PADRAO", "IMPORTANTE", "URGENTE", "CRITICA"]),
  dataParaConclusao: z.coerce.string(),
  dataDeCriacao: z.coerce.string(),
  descricao: z.string().optional(),
});

// Schema para criar nova tarefa
export const createTaskSchema = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  descricao: z.string().optional(),
  urgencia: z.enum(["PADRAO", "IMPORTANTE", "URGENTE", "CRITICA"]).default("PADRAO"),
  dataParaConclusao: z.coerce.string(),
});

// Schema para atualizar tarefa
export const updateTaskSchema = z.object({
  titulo: z.string().min(1).optional(),
  descricao: z.string().optional(),
  urgencia: z.enum(["PADRAO", "IMPORTANTE", "URGENTE", "CRITICA"]).optional(),
  dataParaConclusao: z.coerce.string().optional(),
  concluida: z.boolean().optional(),
});

// Schema para toggle de conclusão (PATCH)
export const toggleTaskSchema = z.object({
  concluida: z.boolean(),
});

// Schema da resposta paginada
export const tasksResponseSchema = z.object({
  tarefas: z.array(taskSchema),
  totalDeTarefas: z.number(),
  paginaAtual: z.number(),
  totalDePaginas: z.number(),
});

// Schema para parâmetros de busca
export const taskSearchParamsSchema = z.object({
  pagina: z.number().min(1).optional(),
  titulo: z.string().optional(),
});

// Schema para deletar múltiplas tarefas
export const deleteMultipleTasksSchema = z.object({
  ids: z.array(z.number()),
});

// Tipos inferidos
export type Task = z.infer<typeof taskSchema>;
export type FullTask = z.infer<typeof fullTaskSchema>;
export type CreateTaskData = z.infer<typeof createTaskSchema>;
export type UpdateTaskData = z.infer<typeof updateTaskSchema>;
export type ToggleTaskData = z.infer<typeof toggleTaskSchema>;
export type TasksResponse = z.infer<typeof tasksResponseSchema>;
export type TaskSearchParams = z.infer<typeof taskSearchParamsSchema>;
export type DeleteMultipleTasksData = z.infer<typeof deleteMultipleTasksSchema>;
