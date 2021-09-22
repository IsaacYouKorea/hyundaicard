import styled, { css } from "styled-components";
import { MODAL_TYPE, usePaymentDispatch, usePaymentState } from "../../context";
import { monthsBefore } from "../../util/date";
import { IconCheck } from "../Icons";
import Modal from "../Modal";

const months = monthsBefore().reverse();
const Wrapper = styled.div`
  ${({ theme }) => css`
    padding: 0 ${theme.paddings.base};
    max-height: 60vh;
    position: relative;
    display: flex;
    flex-direction: column;
  `}
`

const MonthButton = styled.div`
  ${({ theme }) => css`
    width: 100%;
    color: ${theme.colors.white};
    text-align: left;
    font-size: ${theme.fonts.size.lg};
    font-weight: ${theme.fonts.weight.semiBold};
    padding: ${theme.paddings.lg} 0;
    border-bottom: 1px solid ${theme.colors.white}20;
    display: flex;
    justify-content: space-between;
  `}
`;

function MonthModal() {
  const { date } = usePaymentState();
  const dispatch = usePaymentDispatch();
  const setYearMonth = (year: number, month: number, day: number) => dispatch({ type: 'CALENDAR/SET_DATE', year, month, day })
  const { modalOpen, modalType } = usePaymentState();
  const closeModal = () => {
    dispatch({ type: 'UI/OPEN_MODAL', open: false });
    dispatch({ type: 'UI/OPEN_DAY_SUMMARY', daySummaryOpen: false });
  }

  return <Modal open={modalOpen && modalType === MODAL_TYPE.MONTH} title="월선택">
    <Wrapper>
      {months.map((month) =>
        <MonthButton onClick={() => {
          setYearMonth(month.year, month.month, date.day || 1)
          closeModal();
        }}>
          <div>{month.year}년 {month.month + 1}월</div>
          {(month.year === date.year && month.month === date.month) && <div><IconCheck/></div>}
        </MonthButton>
      )}
    </Wrapper>
  </Modal>
}

export default MonthModal;