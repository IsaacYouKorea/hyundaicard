import { IconChevronDown, IconChevronUp } from "../Icons";

function ToggleChevron({size='60%', isUp = false}: {size?: string, isUp?: boolean}) {
  return (
    <span style={{fontSize: '60%'}}>
      {isUp ? <IconChevronUp/> : <IconChevronDown/>}
    </span>
  )
}

export default ToggleChevron;