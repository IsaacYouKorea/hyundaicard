import { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { MODAL_TYPE, usePaymentDispatch, usePaymentState } from "../context";
import { numberWithCommas } from "../util/number";
import ToggleChevron from "./common/ToggleChevron";
import Modal from "./Modal";

const PaymentDetailDiv = styled.div`
  ${({theme}) => css`
    width: 100%;
    height: calc(100vh - ${theme.height.modalHeader});
    top: 0px;
    display: flex;
    flex-direction: column;
    padding: ${theme.paddings.base};
    color: ${theme.colors.white};
    .main {
      margin-bottom: ${theme.margins.base};
    }
    .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    li {
      font-size: ${theme.fonts.size.base};
      padding: ${theme.paddings.base} 0;
      border-bottom: 1px solid ${theme.colors.white}10;
      &:last-of-type {
        border-bottom: 0px;
      }
      & div:last-of-type {
        font-weight: ${theme.fonts.weight.bold};
      }
    }
    
    .price {
      font-size: ${theme.fonts.size.xl};
      font-family: ${theme.fonts.family.youAndI};
      font-weight: ${theme.fonts.weight.bold};
    }

    .client-wrapper {
      padding: ${theme.paddings.base};
      background: ${theme.colors.grey[200]};
      font-weight: ${theme.fonts.weight.semiBold};
      margin-top: ${theme.margins.base};
      border-radius: 0.5rem;
      .dot::after {
        content: "·";
        opacity: 0.6;
      }
      a {
        color: ${theme.colors.blue};
      }
      &>div:first-of-type{
        margin-bottom: ${theme.margins.base};
      }
    }
  `}
`

function PaymentDetail() {

  const [priceDetail, setPriceDetail] = useState(true);

  const { selectedPaymentData } = usePaymentState();
  const dispatch = usePaymentDispatch();
  const { modalOpen, modalType } = usePaymentState();
  const onExited = () => dispatch({type: 'PAYMENT/SELECT_PAYMENT', data: undefined});

  return <Modal open={modalOpen && modalType === MODAL_TYPE.PAYMENT_DETAIL } title={selectedPaymentData?.client || ''} onExited={onExited}>
    <PaymentDetailDiv>
      <div className="flex main">
        <div className="price">{numberWithCommas(selectedPaymentData?.price)}원</div>
        <div onClick={() => setPriceDetail(!priceDetail)}>
          금액상세 <ToggleChevron isUp={!priceDetail}/>
        </div>
      </div>
      <div style={{ display: priceDetail ? "block" : "none" }}>
        <li className="flex">
          <div>거래일자</div>
          <div>{selectedPaymentData?.date.year}.{selectedPaymentData?.date.month}.{selectedPaymentData?.date.day} {selectedPaymentData?.date.hour}:{selectedPaymentData?.date.hour.toString().padStart(2, '0')}:{selectedPaymentData?.date.second.toString().padStart(2, '0')}</div>
        </li>
        <li className="flex">
          <div>결제구분</div>
          <div>{selectedPaymentData?.installment.month === undefined || selectedPaymentData?.installment.month <= 1 ? '일시불' : selectedPaymentData?.installment.month + '개월'}</div>
        </li>
        <li className="flex">
          <div>결제카드</div>
          <div>{selectedPaymentData?.card.name}</div>
        </li>
        <li className="flex">
          <div>카드 소지자</div>
          <div>{selectedPaymentData?.card.holder}</div>
        </li>
        <li className="flex">
          <div>승인번호</div>
          <div>{selectedPaymentData?.approval.number.toString().padStart(8, '0')}</div>
        </li>
        <li className="flex">
          <div>승인상태</div>
          <div>{selectedPaymentData?.approval.state ? '정상' : '비정상'}</div>
        </li>
        <div className="client-wrapper" style={{ marginBottom: "auto" }}>
          <div>
            {selectedPaymentData?.location.address}
          </div>
          <div className="flex">
            <div>
              <a href={`http://maps.google.com/maps?z=12&t=m&q=${37.5000161},${127.0329105}`}>지도 보기</a> <span className="dot"/> <a href={`tel:${selectedPaymentData?.location.phoneNumber}`}>{selectedPaymentData?.location.phoneNumber}</a>
            </div>
            <div>가맹점 상세</div>
          </div>
        </div>
      </div>
    </PaymentDetailDiv>
  </Modal>
}

export default PaymentDetail;