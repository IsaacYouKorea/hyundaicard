import styled, { css } from "styled-components";
import { IconBack } from "./Icons";

const StyledHeader = styled.div`
  ${({theme}) => css`
    font-size: ${theme.fonts.size.title};
    font-weight: ${theme.fonts.weight.bold};
    height: ${theme.paddings.xl};
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    div {
      margin-right: auto;
      margin-left: auto;
    }
    svg {
      position: absolute;
    }
  `}
`

function Header() {
  return (
    <StyledHeader>
      <IconBack/>
      <div>날짜별 이용내역</div>
    </StyledHeader>
  )
}

export default Header;