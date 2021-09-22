import styled from "styled-components";

export const StyledCalendarDay = styled.div<{weekend?: boolean}>`
  flex: 1;
  margin: 0 auto;
  text-align: center;
  color: ${({weekend, theme}) => weekend ? theme.colors.red : theme.colors.white};
  font-weight: ${({theme}) => theme.fonts.weight.bold};
`