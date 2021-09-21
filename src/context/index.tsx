import React, { createContext, Dispatch, useContext, useEffect, useReducer } from "react";
import mockData from '../mock/mock.json';
import { dayString } from "../util/date";

interface PaymentsByDay {
  [key: string]: {
    sum: number,
    list: PaymentData[]
  };
}

interface PaymentsById {
  [key: number]: PaymentData;
}

type State = {
  date: {
    month: number,
    year: number,
    day?: number,
  },
  selectedPaymentData?: PaymentData,
  paymentDataList: PaymentData[],
  paymentsById: PaymentsById,
  paymentsByDay: PaymentsByDay,
  openDaySummary: boolean
}

type Action =
  | { type: 'PAYMENT/SELECT_PAYMENT', data: PaymentData | undefined }
  | { type: 'PAYMENT/LOAD_PAYMENTS', payments: PaymentData[] }
  | { type: 'CALENDAR/SET_DATE', month: number, year: number, day?: number }
  | { type: 'UI/OPEN_DAY_SUMMARY', openDaySummary: boolean }

type PaymentDispatch = Dispatch<Action>;

const PaymentStateContext = createContext<State | null>(null);
const PaymentDispatchContext = createContext<PaymentDispatch | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'PAYMENT/SELECT_PAYMENT':
      return {
        ...state,
        selectedPaymentData: action.data
      }
    case 'PAYMENT/LOAD_PAYMENTS':
      const paymentsByDay = action.payments.reduce<PaymentsByDay>((acc, payment) => {
        const day = dayString(payment.date.year, payment.date.month, payment.date.day || 0);
        if (!acc[day]) acc[day] = { sum: 0, list: [] };
        acc[day].list.push(payment)
        acc[day].sum += payment.price;
        return acc;
      }, {});
      const paymentsById = action.payments.reduce<PaymentsById>((acc, payment) => {
        const id = payment.id;
        acc[id] = payment
        return acc;
      }, {});
      return {
        ...state,
        paymentDataList: action.payments,
        paymentsByDay: paymentsByDay,
        paymentsById: paymentsById,
      }
    case 'CALENDAR/SET_DATE':
      return {
        ...state,
        date: {
          ...action
        }
      }
    case 'UI/OPEN_DAY_SUMMARY':
      return {
        ...state,
        openDaySummary: action.openDaySummary
      }
    default:
      throw new Error('Unhandled action');
  }
}


export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    date: {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate()
    },
    selectedPaymentData: undefined,
    paymentDataList: [],
    openDaySummary: false,
    paymentsByDay: {},
    paymentsById: {}
  });

  useEffect(() => {
    dispatch({ type: 'PAYMENT/LOAD_PAYMENTS', payments: mockData as PaymentData[] })
  }, [])

  return (
    <PaymentStateContext.Provider value={state}>
      <PaymentDispatchContext.Provider value={dispatch}>
        {children}
      </PaymentDispatchContext.Provider>
    </PaymentStateContext.Provider>
  )
}

// state 와 dispatch 를 쉽게 사용하기 위한 커스텀 Hooks
export function usePaymentState() {
  const state = useContext(PaymentStateContext);
  if (!state) throw new Error('Cannot find SampleProvider'); // 유효하지 않을땐 에러를 발생
  return state;
}

export function usePaymentDispatch() {
  const dispatch = useContext(PaymentDispatchContext);
  if (!dispatch) throw new Error('Cannot find SampleProvider'); // 유효하지 않을땐 에러를 발생
  return dispatch;
}