import styled from "styled-components";
import { usePaymentDispatch, usePaymentState } from "../../context";
import CalendarHeader from "./calendar-header";
import CalendarSwiper from "./calendar-swiper";
import MonthCalendar from "./month-calendar";
import MonthModal from "./month-modal";
import MonthSelect from "./month-select";

const CalendarWrapper = styled.div`
  flex-shrink: 0;
`;

function Calendar() {
  const state = usePaymentState();
  // const dispatch = usePaymentDispatch();
  // const setYearMonth = (year:number, month:number) => dispatch({type: 'CALENDAR/SET_DATE', year, month})
  return (
    <CalendarWrapper>
      <MonthSelect year={state.date.year} month={state.date.month}/>
      <CalendarHeader/>
      <CalendarSwiper/>
      <MonthModal/>
    </CalendarWrapper>
  );
}

export default Calendar;