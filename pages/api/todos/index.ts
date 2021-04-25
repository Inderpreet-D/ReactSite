import { NextApiRequest, NextApiResponse } from "next";

import { getTodos, uploadTodos } from "../../../utilities/helpers/todos";

import { Todos } from "../../../shared/todo";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id: string = req.query.id as string;

  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET") {
    const todos = await getTodos(id);
    res.status(200).send({ todos });
  } else if (req.method === "POST") {
    const todos: Todos = req.body.todos;
    await uploadTodos(id, todos);
    res.status(200).send({ result: "DONE" });
  }
};
