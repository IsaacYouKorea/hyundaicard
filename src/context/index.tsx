import React, { createContext, Dispatch, useContext, useReducer } from "react";

type State = {
  date: {
    month: number,
    year: number,
    day?: number,
  },
  selectedPaymentData?: PaymentData,
}

type Action = 
  | {type: 'PAYMENT/SELECT_PAYMENT', data: PaymentData | undefined}
  | {type: 'CALENDAR/SET_DATE', month: number, year: number, day?:number}

type PaymentDispatch = Dispatch<Action>;

const PaymentStateContext = createContext<State | null>(null);
const PaymentDispatchContext = createContext<PaymentDispatch | null>(null);

function reducer(state: State, action: Action): State {
  switch(action.type) {
    case 'PAYMENT/SELECT_PAYMENT': 
      return {
        ...state,
        selectedPaymentData: action.data
      }
    case 'CALENDAR/SET_DATE':
      return {
        ...state,
        date: {
          ...action
        }
      }
    default:
      throw new Error('Unhandled action');
  }
}


export function AppProvider({children}: {children: React.ReactNode}) {
  const [state, dispatch] = useReducer(reducer, {
    date: {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: undefined
    },
    selectedPaymentData: undefined
  });

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