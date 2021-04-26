import styled, { css } from "styled-components";
import {
  VscArrowUp,
  VscArrowDown,
  VscArrowLeft,
  VscArrowRight,
  VscClose,
} from "react-icons/vsc";

export const StyledItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 0.5rem;
  margin-left: ${({ depth }) => (depth + 1) * 2}rem;
  box-sizing: border-box;

  font-size: 1.5rem;
`;

export const StyledButtons = styled.div`
  display: flex;
  margin-right: 1rem;

  & > :not(:last-child) {
    margin-right: 0.5rem;
  }
`;

export const StyledContent = styled.div`
  flex: 1 1;

  transition: all 2s;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: ${({ hover }) => (hover ? "normal" : "nowrap")};

  ${({ done }) =>
    done &&
    css`
      text-decoration: line-through;
      color: #5b5b5b;
    `}
`;

const buttonStyles = css`
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

export const StyledUp = styled(VscArrowUp)`
  ${buttonStyles};
`;

export const StyledDown = styled(VscArrowDown)`
  ${buttonStyles};
`;

export const StyledLeft = styled(VscArrowLeft)`
  ${buttonStyles};
`;

export const StyledRight = styled(VscArrowRight)`
  ${buttonStyles};
`;

export const StyledDelete = styled(VscClose)`
  ${buttonStyles};

  margin-left: 1rem;
`;
