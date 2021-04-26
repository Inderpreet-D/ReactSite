import { StyledCheck, StyledUncheck } from "./Checkbox.styles";

const Checkbox = ({ checked, onCheck, ...props }) => {
  const Icon = checked ? StyledCheck : StyledUncheck;

  return <Icon onClick={() => onCheck(!checked)} {...props} />;
};

export default Checkbox;
