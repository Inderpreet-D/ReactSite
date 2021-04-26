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
      if (item.id in map) {
        return map[item.id];
      }

      if (!item.parent_id) {
        map[item.id] = 0;
        return 0;
      } else {
        if (!(item.id in map)) {
          const depth = 1 + findDepth(todos[item.parent_id]);
          map[item.id] = depth;
          return depth;
        }
      }
    };

    Object.values(todos).forEach((item) => findDepth(item));

    return map;
  }, [todos]);

  React.useEffect(() => {
    const id = localStorage.getItem(ID_KEY);
    setId(id);
  }, []);

  React.useEffect(() => {
    axios.post(`/api/todos?id=${id}`, { todos: Object.values(todos) });
  }, [todos]);

  React.useEffect(() => {
    if (!id) return;

    let mounted = true;

    const getTodos = async () => {
      const data = (await axios.get(`/api/todos?id=${id}`)).data;
      const todos = data.todos || [];
      const formatted = {};

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

  const gatherChildren = React.useCallback(
    (parent_id) => {
      let children = [];

      Object.values(todos).forEach((item) => {
        if (
          item.parent_id === parent_id &&
          !children.map((item) => item.id).includes(item.id)
        ) {
          const more = gatherChildren(item.id);
          children = [...new Set([...children, item, ...more])];
        }
      });

      return children;
    },
    [todos]
  );

  const addItem = () => {
    if (!text.trim().length) return;

    const item = {
      content: text,
      id: uuidv4(),
      parent_id: null,
      done: false,
    };

    if (item.id in todos) {
      addItem();
    } else {
      setTodos((old) => ({ ...old, [item.id]: item }));
      setOrdering((old) => [...old, item.id]);
      setText("");
    }
  };

  const checkKey = (e) => {
    if (e.keyCode === 13) {
      addItem();
    }
  };

  const onCheck = React.useCallback(
    (id) => (newVal) => {
      setTodos((old) => {
        const copy = { ...old };
        copy[id] = { ...copy[id], done: newVal };
        const children = gatherChildren(id);
        children.forEach((item) => {
          copy[item.id] = { ...copy[item.id], done: newVal };
        });
        return copy;
      });
    },
    [gatherChildren]
  );

  const onDelete = React.useCallback(
    (id) => () => {
      setOrdering((old) => old.filter((_id) => _id !== id));

      setTodos((old) => {
        const copy = { ...old };
        delete copy[id];
        const toReturn = {};
        Object.entries(copy).forEach(([key, val]) => {
          toReturn[key] = {
            ...val,
            parent_id: val.parent_id === id ? null : val.parent_id,
          };
        });
        return toReturn;
      });
    },
    []
  );

  const onMoveUp = React.useCallback(
    (id) => () => {
      setOrdering((old) => {
        const idx = old.findIndex((_id) => _id === id);
        const copy = [...old];

        const temp = copy[idx];
        copy[idx] = copy[idx - 1];
        copy[idx - 1] = temp;

        if (temp.parent_id) {
          const newParent = todos.find((id) => id === copy[idx]);
          if (newParent) {
            copy[idx - 1].parent_id = newParent.id;
          }
        }

        return copy;
      });
    },
    []
  );

  const onMoveDown = React.useCallback(
    (id) => () => {
      setOrdering((old) => {
        const idx = old.findIndex((_id) => _id === id);
        const copy = [...old];

        const temp = copy[idx];
        copy[idx] = copy[idx + 1];
        copy[idx + 1] = temp;

        if (temp.parent_id) {
          const newParent = todos.find((id) => id === copy[idx]);
          if (newParent) {
            copy[idx + 1].parent_id = newParent.id;
          }
        }

        return copy;
      });
    },
    []
  );

  const onMoveLeft = React.useCallback(
    (id) => () => {
      setTodos((old) => {
        const temp = {
          ...old[id],
          parent_id: old[old[id].parent_id].parent_id,
        };
        return { ...old, [id]: temp };
      });
    },
    []
  );

  const onMoveRight = React.useCallback(
    (id) => () => {
      const idx = ordering.findIndex((_id) => _id === id);
      const newID = ordering[idx - 1];
      setTodos((old) => {
        return { ...old, [id]: { ...old[id], parent_id: newID } };
      });
    },
    [ordering]
  );

  const renderItems = (items) => {
    return items.map((item) => {
      const id = item.id;
      const idx = ordering.findIndex((_id) => _id === id);

      return (
        <TodoItem
          key={id}
          {...item}
          depth={depthMap[id]}
          onCheck={onCheck(id)}
          onDelete={onDelete(id)}
          canMoveUp={idx > 0}
          canMoveDown={idx < ordering.length - 1}
          onMoveUp={onMoveUp(id)}
          onMoveDown={onMoveDown(id)}
          canMoveLeft={item?.parent_id}
          onMoveLeft={onMoveLeft(id)}
          canMoveRight={ordering.findIndex((_id) => _id === id) > 0}
          onMoveRight={onMoveRight(id)}
        />
      );
    });
  };

  return (
    <Container>
      <ContainerTitle>Todo List</ContainerTitle>

      {ordering.map((id) => {
        if (todos[id]?.parent_id) {
          return null;
        }

        const children = gatherChildren(id);
        const idx = ordering.findIndex((_id) => _id === id);

        return (
          <React.Fragment key={id}>
            <TodoItem
              {...todos[id]}
              depth={depthMap[id]}
              onCheck={onCheck(id)}
              onDelete={onDelete(id)}
              canMoveUp={idx > 0}
              canMoveDown={idx < ordering.length - 1}
              onMoveUp={onMoveUp(id)}
              onMoveDown={onMoveDown(id)}
              canMoveLeft={todos[id]?.parent_id}
              onMoveLeft={onMoveLeft(id)}
              canMoveRight={ordering.findIndex((_id) => _id === id) > 0}
              onMoveRight={onMoveRight(id)}
            />

            {renderItems(children)}
          </React.Fragment>
        );
      })}

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
