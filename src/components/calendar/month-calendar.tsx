import { memo, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { usePaymentDispatch, usePaymentState } from "../../context";
import { dayString } from "../../util/date";
import { numberWithCommas } from "../../util/number";
import { StyledCalendarDay } from "./common";

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

const DayDiv = styled(StyledCalendarDay)`
  height: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ theme, weekend }) => {
    return css`
      &.selected {
        .dayNumber {
          color: ${theme.colors.grey[100]};
          border-radius: 100%;
          background: ${theme.colors.white};
        }
      }
      .dayNumber {
        color: ${weekend ? theme.colors.red : theme.colors.grey[700]};
        font-weight: ${theme.fonts.weight.bold};
        width: 1.5rem;
        height: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: normal;
      }
    `
  }}
`

const DayInfo = styled.div<{isRed?: boolean}>`
  ${({ theme, isRed }) => css`
    margin: ${theme.margins.sm} 0 0;
    font-size: ${theme.fonts.size.sm};
    color: ${isRed ? theme.colors.red : theme.colors.white};
    font-weight: ${theme.fonts.weight.semiBold};
  `}
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

    <Wrapper style={{ transform: `translateY(${daySummaryOpen ? -transformY + 10 : 0}px)` }}>
      {new Array(6).fill(0).map((_, week) => <WeekDiv style={{}} key={week}>
        {new Array(7).fill(0).map((_, day) => {
          const dateNumber = (week * 7) + day - firstDay + 1;
          if (dateNumber > lastDate || dateNumber <= 0) return <DayDiv key={dateNumber}></DayDiv>;
          return <DayDiv
            weekend={day === 0}
            key={dateNumber}
            className={[
              (date.year === year && date.month === month && date.day === dateNumber) ? 'selected' : ''
            ].join(' ')}
            onClick={(evt) => {
              setTransformY((evt.target as HTMLDivElement).offsetTop);
              selectDate(year, month, dateNumber)
            }}>
            <div className="dayNumber">{dateNumber}</div>
            <DayInfo isRed={dateNumber === 25}>
              {dateNumber === 25 ? `결제일` : ''}
              {dateNumber === 25 ? <br /> : ''}
              {numberWithCommas(paymentsByDay[dayString(year, month, dateNumber)]?.sum) || ''}
            </DayInfo>
          </DayDiv>
        })}
      </WeekDiv>)}
    </Wrapper>
  );
}

export default memo(MonthCalendar);