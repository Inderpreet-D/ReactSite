import { get, set } from "../database";

import { Todos } from "../../../shared/todo";

const getPath = (id: string): string => {
  return `todos/${id}`;
};

export const getTodos = async (id: string): Promise<Todos | null> => {
  const val = await get(getPath(id));
  if (val) {
    return val as Todos;
  }
  return null;
};

export const uploadTodos = async (id: string, todos: Todos) => {
  await set(getPath(id), todos);
};
