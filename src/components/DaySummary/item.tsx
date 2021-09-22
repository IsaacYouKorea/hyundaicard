import { useCallback } from "react";
import styled, { css } from "styled-components";
import { MODAL_TYPE, usePaymentDispatch } from "../../context";
import { numberWithCommas } from "../../util/number";

const StyledItem = styled.div`
  ${({ theme }) => css`
  margin: ${theme.margins.base} 0;
  .main {
    display: flex;
    justify-content: space-between;
    font-size: ${theme.fonts.size.lg};
    margin-bottom: ${theme.margins.xs};
    font-weight: ${theme.fonts.weight.bold};
  }
  .sub {
    color: ${theme.colors.grey[700]};
    font-size: ${theme.fonts.size.base};
  }
  `}
`

function Item({ payment }: { payment: PaymentData }) {

  const dispatch = usePaymentDispatch();
  const openDetail = useCallback((data: PaymentData) => {
    dispatch({ type: 'PAYMENT/SELECT_PAYMENT', data });
    dispatch({ type: 'UI/OPEN_MODAL', open: true, modalType: MODAL_TYPE.PAYMENT_DETAIL });
  }, [dispatch]);

  return <StyledItem onClick={() => openDetail(payment)}>
    <div className="main">
      <div>{payment.client}</div>
      <div>{numberWithCommas(payment.price)}원</div>
    </div>
    <div className="sub">
      <span>{payment.date.year}.{payment.date.month}.{payment.date.day} {payment.date.hour}:{payment.date.minute} {payment.installment.month ? payment.installment.month + '개월' : '일시불'}</span>
    </div>
  </StyledItem>
}

export default Item;