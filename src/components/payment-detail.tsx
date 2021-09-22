import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { usePaymentDispatch, usePaymentState } from "../context";
import Modal from "./Modal";

const PaymentDetailDiv = styled.div`
  width: 100%;
  height: 100vh;
  top: 0px;
  display: flex;
  flex-direction: column;
`

function PaymentDetail() {

  const [priceDetail, setPriceDetail] = useState(true);

  const { selectedPaymentData } = usePaymentState();
  const dispatch = usePaymentDispatch();
  const { modalOpen } = usePaymentState();
  const onExited = () => dispatch({type: 'PAYMENT/SELECT_PAYMENT', data: undefined});

  return <Modal open={modalOpen && !!selectedPaymentData} title={selectedPaymentData?.client || ''} onExited={onExited}>
    <PaymentDetailDiv>
      <div>
        <div>
          <div>{selectedPaymentData?.price}</div>
        </div>
        <button onClick={() => setPriceDetail(!priceDetail)}>
          금액상세
        </button>
      </div>
      <div style={{ display: priceDetail ? "block" : "none" }}>
        <div>
          <div>거래일자</div>
          <div>{selectedPaymentData?.date.year}.{selectedPaymentData?.date.month}.{selectedPaymentData?.date.day} {selectedPaymentData?.date.hour}:{selectedPaymentData?.date.hour.toString().padStart(2, '0')}:{selectedPaymentData?.date.second.toString().padStart(2, '0')}</div>
        </div>
        <div>
          <div>결제구분</div>
          <div>{selectedPaymentData?.installment.month === 0 ? '일시불' : selectedPaymentData?.installment.month + '개월'}</div>
        </div>
        <div>
          <div>결제카드</div>
          <div>{selectedPaymentData?.card.name}</div>
        </div>
        <div>
          <div>카드 소지자</div>
          <div>{selectedPaymentData?.card.holder}</div>
        </div>
        <div>
          <div>승인번호</div>
          <div>{selectedPaymentData?.approval.number.toString().padStart(8, '0')}</div>
        </div>
        <div>
          <div>승인상태</div>
          <div>{selectedPaymentData?.approval.state}</div>
        </div>
      </div>
      <div style={{ marginBottom: "auto" }}>
        <div>
          {selectedPaymentData?.location.address}
        </div>
        <div>
          <div>
            <a href={`http://maps.google.com/maps?z=12&t=m&q=${37.5000161},${127.0329105}`}>{selectedPaymentData?.location.phoneNumber}</a>
            <a href={`tel:${selectedPaymentData?.location.phoneNumber}`}>{selectedPaymentData?.location.phoneNumber}</a>
          </div>
          <div>가맹점 상세</div>
        </div>
      </div>
    </PaymentDetailDiv>
  </Modal>
}

export default PaymentDetail;