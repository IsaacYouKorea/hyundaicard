interface IProps {
  year: number
  month: number
}

function MonthSelect({year, month}: IProps) {
  return <button>{year}년 {month + 1}월</button>
}

export default MonthSelect;