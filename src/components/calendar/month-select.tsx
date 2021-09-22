import styled, { css } from "styled-components";
import { MODAL_TYPE, usePaymentDispatch } from "../../context";
import ToggleChevron from "../common/ToggleChevron";

interface IProps {
  year: number
  month: number
}

const StyledButton = styled.button`
  ${({ theme }) =>
    css`
      color: ${theme.colors.white};
      font-size: ${theme.fonts.size.xl};
      font-family: ${theme.fonts.family.youAndI};
      font-weight: ${theme.fonts.weight.bold};
      margin: ${theme.margins.lg} 0;
    `
  }
`

function MonthSelect({ year, month }: IProps) {
  const dispatch = usePaymentDispatch();
  const openModalMonth = () => dispatch({ type: 'UI/OPEN_MODAL', open: true, modalType: MODAL_TYPE.MONTH })
  return <StyledButton onClick={openModalMonth}>{month + 1}월 <ToggleChevron/></StyledButton>
}

export default MonthSelect;