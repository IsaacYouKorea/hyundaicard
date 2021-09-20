enum APPROVAL_STATE {
  NORMAL= 'NORMAL',
  ABNORMAL = 'ABNORMAL',
  WAITING = 'WAITING'
}

interface Location {
  address: string,
  phoneNumber: string,
}

interface Card {
  id: string,
  name: string,
  holder: string,
}

interface Approval {
  number: string, // 승인 번호
  state: APPROVAL_STATE // 승인 상태
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
  id: string,
  date: DateTime,
  installment: Installment,
  card: Card,
  approval: Approval,
  location: Location,
  price: number,
  client: Client
}