import { usePaymentDispatch } from "../../context";

interface IProps {
  year: number
  month: number
}

function MonthSelect({year, month}: IProps) {
  const dispatch = usePaymentDispatch();
  const openModalMonth = () => dispatch({type: 'UI/OPEN_MODAL', open: true})
  return <button onClick={openModalMonth}>{year}년 {month + 1}월</button>
}

export default MonthSelect;