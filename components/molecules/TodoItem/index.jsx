import React from "react";

import { StyledItem } from "./TodoItem.styles";

const TodoItem = ({ content, done }) => {
  return (
    <StyledItem done>
      <div></div>

      {content}

      <div></div>
    </StyledItem>
  );
};

export default TodoItem;
