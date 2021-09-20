import { usePaymentDispatch, usePaymentState } from "../../context";
import CalendarSwiper from "./calendar-swiper";
import MonthCalendar from "./month-calendar";
import MonthModal from "./month-modal";
import MonthSelect from "./month-select";

function Calendar() {
  const state = usePaymentState();
  const dispatch = usePaymentDispatch();
  const setYearMonth = (year:number, month:number) => dispatch({type: 'CALENDAR/SET_DATE', year, month})
  return (
    <div>
      <MonthSelect year={state.date.year} month={state.date.month}/>
      <CalendarSwiper/>
      <MonthModal setYearMonth={setYearMonth}/>
    </div>
  );
}

export default Calendar;