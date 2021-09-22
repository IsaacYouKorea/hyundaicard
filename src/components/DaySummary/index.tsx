import { useCallback, useEffect, useState } from "react";
import { usePaymentDispatch, usePaymentState } from "../../context";
import styled, { css } from 'styled-components';
import { dayNames, dayString } from "../../util/date";
import Item from "./item";


const DaySummaryDiv = styled.div<{ open: boolean }>`
  ${({ theme, open }) =>
    css`
    margin: -${theme.paddings.base};
    padding: 0 ${theme.paddings.base};
    background: ${theme.colors.background};
    transition: 0.5s transform;
    z-index: 5;
    width: 100vw;
    height: 100px;
    flex: 1;
    flex-direction: column;
    flex-shrink: 1;
    display: flex;
    .toggle-ui {
      width: 100vw;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      border-bottom: 1px solid ${theme.colors.divider};
      margin: 0 -${theme.paddings.base};
      height: 3rem;
      .btn-open {
        width: 3rem;
        height: 1.5rem;
        background: white;
        margin: 0 auto;
      }
    }
    .date {
      color: ${theme.colors.grey[700]};
      margin: ${theme.margins.base} 0 ${theme.margins.sm};
      font-weight: ${theme.fonts.weight.semiBold};
      width: 100%;
      .payment-date {
        color: ${theme.colors.white};
      }
    }
    .scroll {
      overflow-y: scroll;
      margin: 0 -${theme.paddings.base};
      padding: 0 ${theme.paddings.base};
      height: 100px;
      flex: 1;
      .message {
        text-align: center;
        margin: ${theme.margins.xl} 0;
        color: ${theme.colors.grey[700]};
        font-size: ${theme.fonts.size.base};
        line-height: 1.5;
        letter-spacing: -1px;
        .button-specification {
          width: 100%;
          height: 3rem;
          background: ${theme.colors.grey[300]};
          color: ${theme.colors.white};
          margin: ${theme.margins.xl} 0;
          border-radius: 0.5rem;
        }
      }
    }
    `
  }
`

function DaySummary() {
  const [list, setList] = useState<PaymentData[]>([]);

  const state = usePaymentState();
  const dispatch = usePaymentDispatch();

  const [dayName, setDayName] = useState('');

  const toggleSummary = useCallback(() => {
    dispatch({ type: 'UI/OPEN_DAY_SUMMARY', daySummaryOpen: !state.daySummaryOpen });
  }, [state.daySummaryOpen, dispatch]);

  useEffect(() => {
    const day = dayString(state.date.year, state.date.month, state.date.day || 0);
    setList(state.paymentsByDay[day]?.list || []);
    const dayIndex = new Date(state.date.year, state.date.month, state.date.day).getDay();
    setDayName(dayNames[dayIndex]);
  }, [state.date, state.paymentsByDay])



  return (
    <DaySummaryDiv open={state.daySummaryOpen} style={{ transform: `translateY(${state.daySummaryOpen ? '-300px' : '0px'})` }}>
      <div className="toggle-ui">
        <button className="btn-open" onClick={toggleSummary} />
      </div>
      <div className="date">
        {state.date.day === state.paymentDate && <span className="payment-date">결제일</span>} {state.date.month + 1}월 {state.date.day}일 ({dayName})
      </div>
      <div className="scroll">
        <div className="list">
          {list.map((item) => <Item payment={item} />)}
        </div>
        <div className="message">
          {list.length === 0 && '이용내역이 없습니다'}
          {state.date.day === state.paymentDate && <button className="button-specification">{state.date.month + 1}월 명세서 보기</button>}
          {(list.length !== 0 || state.date.day === state.paymentDate) &&
            <span>일부 금액은 실제 결제 금액과 다를 수 있습니다.<br />정확한 결제 금액은 이용대금명세서를 확인해 주세요.</span>}
        </div>
      </div>
    </DaySummaryDiv>
  );
}

export default DaySummary;