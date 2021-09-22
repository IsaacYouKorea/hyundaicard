import styled from "styled-components";
import { dayNames } from "../../util/date";
import { StyledCalendarDay } from "./common";

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