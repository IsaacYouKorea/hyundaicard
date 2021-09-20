import { useContext, useState } from "react";
import { usePaymentState } from "../context";


function PaymentDetail() {
  const [priceDetail, setPriceDetail] = useState(true);
  
  const { selectedPaymentData } = usePaymentState();
  if (!selectedPaymentData) {
    return <></>;
  }
  const { client, price, date, approval, card, installment, location } = selectedPaymentData;
  
  return <div>
    <div>
      {client.name}
    </div>
    <div>
      <div>
        {price}
      </div>
      <button onClick={() => setPriceDetail(!priceDetail)}>
        금액상세
      </button>
    </div>
    <div style={{ display: priceDetail ? "block" : "none" }}>
      <div>
        <div>거래일자</div>
        <div>{date.year}.{date.month}.{date.day} {date.hour}:{date.hour.toString().padStart(2, '0')}:{date.second.toString().padStart(2, '0')}</div>
      </div>
      <div>
        <div>결제구분</div>
        <div>{installment.month === 0 ? '일시불' : installment.month + '개월'}</div>
      </div>
      <div>
        <div>결제카드</div>
        <div>{card.name}</div>
      </div>
      <div>
        <div>카드 소지자</div>
        <div>{card.holder}</div>
      </div>
      <div>
        <div>승인번호</div>
        <div>{approval.number.padStart(8, '0')}</div>
      </div>
      <div>
        <div>승인상태</div>
        <div>{approval.state}</div>
      </div>
    </div>
    <div>
      <div>
        {location.address}
      </div>
      <div>
        <div>
          <a href={`http://maps.google.com/maps?z=12&t=m&q=${37.5000161},${127.0329105}`}>{location.phoneNumber}</a>
          <a href={`tel:${location.phoneNumber}`}>{location.phoneNumber}</a>
        </div>
        <div>가맹점 상세</div>
      </div>
    </div>
  </div>
}

export default PaymentDetail;