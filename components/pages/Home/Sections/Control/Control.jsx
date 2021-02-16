import styled from "styled-components";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import Button from "../../../../atoms/Button";

const StyledControlButton = styled(Button)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;

  & > ${StyledControlButton}:first-child {
    margin-right: 1rem;
  }

  & > ${StyledControlButton}:last-child {
    margin-left: 1rem;
  }
`;

const Control = ({ current, last, onForward, onBack }) => (
  <StyledControls>
    <StyledControlButton disabled={current === 0} onClick={onBack}>
      <FaAngleLeft />
    </StyledControlButton>
    {current + 1} / {last}
    <StyledControlButton disabled={current === last - 1} onClick={onForward}>
      <FaAngleRight />
    </StyledControlButton>
  </StyledControls>
);

export default Control;
