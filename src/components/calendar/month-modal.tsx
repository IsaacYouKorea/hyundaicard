import styled from "styled-components";
import { MODAL_TYPE, usePaymentDispatch, usePaymentState } from "../../context";
import { monthsBefore } from "../../util/date";
import Modal from "../Modal";

const months = monthsBefore();

function MonthModal() {
  const { date } = usePaymentState();
  const dispatch = usePaymentDispatch();
  const setYearMonth = (year: number, month: number, day: number) => dispatch({ type: 'CALENDAR/SET_DATE', year, month, day })
  const { modalOpen, modalType } = usePaymentState();

  return <Modal open={modalOpen && modalType === MODAL_TYPE.MONTH } title="월선택">
    <div>
      {months.map((month) =>
        <button onClick={() =>
          setYearMonth(month.year, month.month, date.day || 1)
        }>
          {month.year}년 {month.month + 1}월
        </button>
      )}
    </div>
  </Modal>
}

export default MonthModal;