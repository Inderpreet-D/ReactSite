import {
  StyledItem,
  StyledButtons,
  StyledUp,
  StyledDown,
  StyledLeft,
  StyledRight,
  StyledContent,
  StyledDelete,
} from "./TodoItem.styles";
import Checkbox from "../../atoms/Checkbox";

const TodoItem = ({
  content,
  depth,
  done,
  onCheck,
  onDelete,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  canMoveLeft,
  canMoveRight,
  onMoveLeft,
  onMoveRight,
}) => {
  const [hover, setHover] = React.useState(false);

  const handleHover = (val) => () => setHover(val);

  return (
    <StyledItem
      depth={depth}
      onMouseEnter={handleHover(true)}
      onMouseLeave={handleHover(false)}
    >
      <Checkbox
        checked={done}
        onCheck={onCheck}
        style={{ marginRight: "1rem" }}
      />

      <StyledContent hover={hover} done={done}>
        {content}
      </StyledContent>

      <StyledButtons>
        {canMoveLeft && <StyledLeft onClick={onMoveLeft} />}

        {canMoveUp && <StyledUp onClick={onMoveUp} />}

        {canMoveDown && <StyledDown onClick={onMoveDown} />}

        {canMoveRight && <StyledRight onClick={onMoveRight} />}

        <StyledDelete onClick={onDelete} />
      </StyledButtons>
    </StyledItem>
  );
};

export default TodoItem;
