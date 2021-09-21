import { useCallback, useEffect, useState } from "react";
import { usePaymentDispatch, usePaymentState } from "../../context";
import styled from 'styled-components';
import { dayString } from "../../util/date";
import Item from "./item";

const DaySummaryDiv = styled.div<{ open: boolean }>`
  transition: 0.5s transform;
  background: white;
  z-index: 5;
  position: absolute;
  bottom: 0px;
  min-height: 40vh;
  width: 100%;
  transform: ${(props) => `translateY(${props.open ? '-400px' : '0px'})`}
`

function DaySummary() {
  const [list, setList] = useState<PaymentData[]>([]);
  
  const state = usePaymentState();
  const dispatch = usePaymentDispatch();
  
  const toggleSummary = useCallback(() => {
    dispatch({ type: 'UI/OPEN_DAY_SUMMARY', openDaySummary: !state.openDaySummary });
  }, [state.openDaySummary, dispatch]);

  useEffect(() => {
    const day = dayString(state.date.year, state.date.month, state.date.day || 0);
    setList(state.paymentsByDay[day]?.list || []);
  }, [state.date, state.paymentsByDay])

  return (
    <DaySummaryDiv open={state.openDaySummary}>
      <button onClick={toggleSummary}></button>
      <div>
        {state.date.month + 1}월 {state.date.day}일
      </div>
      
      <div className="list">
        {list.length === 0 && '이용내역이 없습니다'}
        {list.map((item) => <Item payment={item}/>)}
      </div>
    </DaySummaryDiv>
  );
}

export default DaySummary;