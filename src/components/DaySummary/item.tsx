import { useCallback } from "react";
import styled, { css } from "styled-components";
import { MODAL_TYPE, usePaymentDispatch } from "../../context";
import { fixDigit, numberWithCommas } from "../../util/number";

const StyledItem = styled.div`
  ${({ theme }) => css`
  margin: ${theme.margins.base} 0;
  
  .main {
    display: flex;
    justify-content: space-between;
    font-size: ${theme.fonts.size.lg};
    margin-bottom: ${theme.margins.xs};
    font-weight: ${theme.fonts.weight.semiBold};  
    letter-spacing: -0.8px;
  }
  .sub {
    color: ${theme.colors.grey[700]};
    font-size: ${theme.fonts.size.base};
    font-weight: ${theme.fonts.weight.semiBold};
    .dot::after {
      content: "·";
      opacity: 0.6;
    }
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
      <span>{payment.date.year.toString().slice(2, 4)}. {payment.date.month + 1}. {payment.date.day} <span className="dot"/> {fixDigit(payment.date.hour)}:{fixDigit(payment.date.minute)} <span className="dot"/> {payment.installment.month > 1 ? payment.installment.month + '개월' : '일시불'}</span>
    </div>
  </StyledItem>
}

export default Item;