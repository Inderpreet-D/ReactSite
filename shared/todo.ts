export interface TodoItem {
  content: string;
  id: string;
  parent_id: string | null;
  done: boolean;
}

export type Todos = TodoItem[];
