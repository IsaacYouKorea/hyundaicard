import styled, { css } from "styled-components";

const StyledHeader = styled.div`
  ${({theme}) => css`
    font-size: ${theme.fonts.size.title};
    font-weight: ${theme.fonts.weight.bold};
    height: ${theme.paddings.xl};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  `}
`

function Header() {
  return (
    <StyledHeader>
      날짜별 이용내역
    </StyledHeader>
  )
}

export default Header;