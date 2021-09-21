import { usePaymentDispatch, usePaymentState } from "../../context";
import { dayString } from "../../util/date";
import { numberWithCommas } from "../../util/number";

interface IProps {
  year: number,
  month: number,
  // setMonth: (year: number, month: number) => void
}

const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
function MonthCalendar({ year, month }: IProps) {

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const { date, paymentsByDay } = usePaymentState();
  const dispatch = usePaymentDispatch();
  const selectDate = (year: number, month: number, day: number) => {
    dispatch({ type: "CALENDAR/SET_DATE", year, month, day });
  }

  return (
    <div>
      <table style={{ width: '100%' }}>
        <thead>
          <tr className="day-names">
            {dayNames.map((dayName, index) => <td key={index} className={index === 0 ? 'color-red' : 'color-grey'}>{dayName}</td>)}
          </tr>
        </thead>
        <tbody>
          {new Array(6).fill(0).map((_, week) => <tr key={week}>
            {new Array(7).fill(0).map((_, day) => {
              const dateNumber = (week * 7) + day - firstDay + 1;
              if (dateNumber > lastDate || dateNumber <= 0) return <td key={dateNumber}></td>;
              return <td key={dateNumber} className={[day === 0 ? "color-red" : "color-grey", (date.year === year && date.month === month && date.day === dateNumber) ? 'selected' : ''].join(' ')} onClick={() => selectDate(year, month, dateNumber)}>
                <div>{dateNumber}</div>
                <div>
                  {dateNumber === 25 ? `결제일` : ''}
                  {dateNumber === 25 ? <br/> : ''}
                  {numberWithCommas(paymentsByDay[dayString(year, month, dateNumber)]?.sum || 0)}
                </div>
              </td>
            })}
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}

export default MonthCalendar;