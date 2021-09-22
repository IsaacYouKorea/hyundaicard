import styled from "styled-components";
import { StyledCalendarDay } from "./common";

const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

const StyledCalendarHeader = styled.div`
  display: flex;
  width: 100%;
`

function CalendarHeader() {
  return <StyledCalendarHeader className="day-names">
    {dayNames.map((dayName, index) =>
      <StyledCalendarDay key={index} weekend={index === 0}>{dayName}</StyledCalendarDay>)}
  </StyledCalendarHeader>;
}

export default CalendarHeader;