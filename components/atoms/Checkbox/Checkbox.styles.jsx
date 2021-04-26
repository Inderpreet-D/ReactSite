import styled, { css } from "styled-components";
import { VscCheck } from "react-icons/vsc";

const baseStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid ${({ theme }) => theme.foregroundDark};
  border-radius: 25%;
  box-sizing: border-box;
  height: 100%;
  padding: 0.125rem;

  background-color: ${({ theme }) => theme.foregroundDark};

  transition: all 500ms, transform 0s;

  font-size: 1.5rem;
  color: white;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.foreground};
    border-radius: 0;

    transform: scale(1.05);

    background-color: ${({ theme }) => theme.foreground};

    color: black;
  }
`;

export const StyledCheck = styled(VscCheck)`
  ${baseStyles};
`;

export const StyledUncheck = styled(VscCheck)`
  ${baseStyles};

  color: transparent;
  user-select: none;

  &:hover {
    color: transparent;
  }
`;
