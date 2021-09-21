enum APPROVAL_STATE {
  NORMAL= 'NORMAL',
  ABNORMAL = 'ABNORMAL',
  WAITING = 'WAITING'
}

interface Address {
  address: string,
  phoneNumber: string,
}

interface Card {
  id: number,
  name: string,
  holder: string,
}

interface Approval {
  number: number, // 승인 번호
  state: boolean // 승인 상태
}

interface Installment {
  month: number,
  paid: boolean
}

interface Client {
  name: string
}

interface DateTime {
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number
}

interface PaymentData {
  id: number,
  date: DateTime,
  installment: Installment,
  card: Card,
  approval: Approval,
  location: Address,
  price: number,
  client: string
}