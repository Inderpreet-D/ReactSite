import styled, { css } from "styled-components";
import { VscArrowUp, VscArrowDown, VscClose } from "react-icons/vsc";

const buttonStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid teal;
  box-sizing: border-box;
  height: 100%;
  cursor: pointer;
`;

const doneStyles = css`
  color: #5b5b5b;
  /* border-left-color: #5b5b5b; */
`;

export const StyledItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 0.5rem;
  margin-left: ${({ depth }) => (depth + 1) * 2}rem;
  /* border-left: 0.0625rem solid white; */
  box-sizing: border-box;
  height: 1rem;
  /* padding-left: 0.75rem; */

  font-size: 1rem;
  line-height: 1rem;

  ${({ done }) => done && doneStyles};
`;

export const StyledButtons = styled.div`
  display: flex;
  margin-right: 1rem;

  &:first-child:not(:last-child) {
    color: red;
  }
`;

export const StyledUp = styled(VscArrowUp)`
  ${buttonStyles}
`;

export const StyledDown = styled(VscArrowDown)`
  ${buttonStyles}
`;

export const StyledClose = styled(VscClose)`
  ${buttonStyles}
`;
