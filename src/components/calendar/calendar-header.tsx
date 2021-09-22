import styled from "styled-components";

const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

const StyledCalendarHeader = styled.div`
  display: flex;
  width: 100%;
`

const StyledItem = styled.div<{weekend?: boolean}>`
  flex: 1;
  color: ${({weekend, theme}) => weekend ? theme.colors.red : theme.colors.white};
  weight: ${({theme}) => theme.fonts.weight.bold};
`

function CalendarHeader() {
  return <StyledCalendarHeader className="day-names">
    {dayNames.map((dayName, index) =>
      <StyledItem key={index} weekend={index === 0}>{dayName}</StyledItem>)}
  </StyledCalendarHeader>;
}

export default CalendarHeader;