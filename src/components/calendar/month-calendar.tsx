import { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { usePaymentDispatch, usePaymentState } from "../../context";
import { dayString } from "../../util/date";
import { numberWithCommas } from "../../util/number";

interface IProps {
  year: number,
  month: number,
  // setMonth: (year: number, month: number) => void
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  transition: 0.5s transform;
`

const WeekDiv = styled.div`
  display: flex;
`

const DayDiv = styled.div`
  flex: 1;
  .dayInfo {

  }
  .dayNumber {

  }
`


function MonthCalendar({ year, month }: IProps) {

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const { date, paymentsByDay, daySummaryOpen } = usePaymentState();
  const dispatch = usePaymentDispatch();
  const selectDate = (year: number, month: number, day: number) => {
    dispatch({ type: "CALENDAR/SET_DATE", year, month, day });
  }

  const [transformY, setTransformY] = useState(0);

  return (
    
    <Wrapper style={{transform: `translateY(${daySummaryOpen ? -transformY : 0}px)`}}>
        {new Array(6).fill(0).map((_, week) => <WeekDiv style={{}} key={week}>
          {new Array(7).fill(0).map((_, day) => {
            const dateNumber = (week * 7) + day - firstDay + 1;
            if (dateNumber > lastDate || dateNumber <= 0) return <DayDiv key={dateNumber}></DayDiv>;
            return <DayDiv
              key={dateNumber}
              className={[
                day === 0 ? "color-red" : "color-grey",
                (date.year === year && date.month === month && date.day === dateNumber) ? 'selected' : ''
              ].join(' ')}
              onClick={(evt) => {
                setTransformY((evt.target as HTMLDivElement).offsetTop);
                selectDate(year, month, dateNumber)
              }}>
              <div className="dayNumber">{dateNumber}</div>
              <div className="dayInfo">
                {dateNumber === 25 ? `결제일` : ''}
                {dateNumber === 25 ? <br/> : ''}
                {numberWithCommas(paymentsByDay[dayString(year, month, dateNumber)]?.sum) || ''}
              </div>
            </DayDiv>
          })}
        </WeekDiv>)}
    </Wrapper>
  );
}

export default memo(MonthCalendar);