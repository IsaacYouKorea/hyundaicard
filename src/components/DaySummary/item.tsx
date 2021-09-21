import { useCallback } from "react";
import styled from "styled-components";
import { usePaymentDispatch } from "../../context";

const StyledItem = styled.div`
  .flex {
    display: flex;
    justify-content: space-between;
  }
  text-align: left;
`

function Item({ payment }: { payment: PaymentData }) {

  const dispatch = usePaymentDispatch();
  const openDetail = useCallback((data: PaymentData) => {
    dispatch({ type: 'PAYMENT/SELECT_PAYMENT', data });
  }, [dispatch]);

  return <StyledItem onClick={() => openDetail(payment)}>
    <div className="flex">
      <div>{payment.client}</div>
      <div>{payment.price}</div>
    </div>
    <div>
      <span>{payment.date.year}.{payment.date.month}.{payment.date.day} {payment.date.hour}:{payment.date.minute} {payment.installment.month ? payment.installment.month + '개월' : '일시불'}</span>
    </div>
  </StyledItem>
}

export default Item;