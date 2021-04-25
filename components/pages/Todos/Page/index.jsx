import React from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import Container, { ContainerTitle } from "../../../atoms/Container";
import { StyledTextFieldHolder, StyledTextField } from "./Page.styles";

import { ID_KEY } from "../../../../shared/constants";
import TodoItem from "../../../molecules/TodoItem";

const Page = () => {
  const [id, setId] = React.useState(null);
  const [todos, setTodos] = React.useState({});
  const [ordering, setOrdering] = React.useState([]);
  const [text, setText] = React.useState("");
  const depthMap = React.useMemo(() => {
    if (!todos) return {};

    const map = {};

    const findDepth = (item) => {
      if (!item.parent_id) {
        map[item.id] = 0;
      } else {
        if (!(item.id in map)) {
          const depth = 1 + findDepth(todos[item.parent_id]);
          map[item.id] = depth;
        }
      }

      return map[item.id];
    };

    Object.values(todos).forEach((item) => findDepth(item));

    return map;
  }, [todos]);

  React.useEffect(() => {
    const id = localStorage.getItem(ID_KEY);
    setId(id);
  }, []);

  React.useEffect(() => {
    if (!id) return;

    let mounted = true;

    const getTodos = async () => {
      const data = (await axios.get(`/api/todos?id=${id}`)).data;
      const todos = data.todos || [];
      const formatted = {};

      console.log({ data });

      todos.forEach((todo) => {
        formatted[todo.id] = todo;
      });

      if (mounted) {
        setTodos(formatted);
        setOrdering(todos.map((item) => item.id));
      }
    };

    getTodos();

    return () => {
      mounted = false;
    };
  }, [id]);

  const uploadItem = () => {
    if (!text.trim().length) return;

    const item = {
      content: text,
      id: uuidv4(),
      parent_id: null,
      done: false,
    };
    console.log({ item });

    if (item.id in todos) {
      uploadItem();
    } else {
      setTodos((old) => ({ ...old, [item.id]: item }));
      setOrdering((old) => [...old, item.id]);
      setText("");
    }
  };

  const checkKey = (e) => {
    if (e.keyCode === 13) {
      uploadItem();
    }
  };

  return (
    <Container>
      <ContainerTitle>Todo List</ContainerTitle>

      {ordering.map((id) => (
        <TodoItem key={id} {...todos[id]} depth={depthMap[id]} />
      ))}

      <div>Depth</div>

      {JSON.stringify(depthMap, null, 2)}

      <StyledTextFieldHolder>
        <StyledTextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter todo item"
          onKeyDown={checkKey}
        />
      </StyledTextFieldHolder>
    </Container>
  );
};

export default Page;
