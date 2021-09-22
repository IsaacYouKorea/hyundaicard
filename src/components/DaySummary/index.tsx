import { useCallback, useEffect, useState } from "react";
import { usePaymentDispatch, usePaymentState } from "../../context";
import styled, { css } from 'styled-components';
import { dayString } from "../../util/date";
import Item from "./item";

const DaySummaryDiv = styled.div<{ open: boolean }>`
  ${({ theme, open }) =>
    css`
    margin: -${theme.paddings.base};
    padding: 0 ${theme.paddings.base};
    border-top: 1px solid ${theme.colors.divider};
    transform: translateY(${open ? '-350px' : '0px'})
    transition: 0.5s transform;
    z-index: 5;
    position: absolute;
    bottom: 0px;
    min-height: 40vh;
    width: 100%;
    .scroll {
      overflow-y: scroll;
      .message {
        text-align: center;
        margin-top: ${theme.margins.xl};
        color: ${theme.colors.grey[700]};
      }
      .date {
          color: ${theme.colors.grey[700]};
          margin-bottom: ${theme.margins.lg};
      }
    }
    `
  }
`

function DaySummary() {
  const [list, setList] = useState<PaymentData[]>([]);

  const state = usePaymentState();
  const dispatch = usePaymentDispatch();

  const toggleSummary = useCallback(() => {
    dispatch({ type: 'UI/OPEN_DAY_SUMMARY', daySummaryOpen: !state.daySummaryOpen });
  }, [state.daySummaryOpen, dispatch]);

  useEffect(() => {
    const day = dayString(state.date.year, state.date.month, state.date.day || 0);
    setList(state.paymentsByDay[day]?.list || []);
  }, [state.date, state.paymentsByDay])

  return (
    <DaySummaryDiv open={state.daySummaryOpen}>
      <button onClick={toggleSummary}></button>
      <div className="date">
        {state.date.month + 1}월 {state.date.day}일
      </div>
      <div className="scroll">
        <div className="list">
          {list.map((item) => <Item payment={item} />)}
        </div>
        <div className="message">
          {list.length === 0 && '이용내역이 없습니다'}
          {list.length !== 0 && 
            <span>일부 금액은 실제 결제 금액과 다를 수 있습니다.<br/>정확한 결제 금액은 이용대금명세서를 확인해 주세요.</span>}
        </div>
      </div>
    </DaySummaryDiv>
  );
}

export default DaySummary;