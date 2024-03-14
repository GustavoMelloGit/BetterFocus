export type TodoId = string;
export type TodoDate = number;

export type Todo = {
  id: TodoId;
  message: string;
  completed: boolean;
  completedAt: TodoDate | null;
  createdAt: TodoDate;
  updatedAt: TodoDate | null;
  deletedAt: TodoDate | null;
};
