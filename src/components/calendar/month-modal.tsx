import styled from "styled-components";
import { usePaymentDispatch, usePaymentState } from "../../context";
import { monthsBefore } from "../../util/date";

const StyledMonthModal = styled.div``

const months = monthsBefore();

function MonthModal() {
  const { date } = usePaymentState();
  const dispatch = usePaymentDispatch();
  const closeModal = () => undefined;
  const setYearMonth = (year: number, month: number, day: number) => dispatch({ type: 'CALENDAR/SET_DATE', year, month, day })

  return <StyledMonthModal>
    <div className="bg">
      <div className="modal">
        <div>
          <div>월선택</div>
          <button onClick={closeModal}>닫기</button>
        </div>
        <div>
          {months.map((month) =>
            <button onClick={() =>
              setYearMonth(month.year, month.month, date.day || 1)
            }>
              {month.year}년 {month.month + 1}월
            </button>
          )}
        </div>
      </div>
    </div>
  </StyledMonthModal>
}

export default MonthModal;