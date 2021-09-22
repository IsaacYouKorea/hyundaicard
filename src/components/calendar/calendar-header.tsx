const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

function CalendarHeader() {
  return <table style={{ width: '100%' }}>
    <thead>
      <tr className="day-names">
        {dayNames.map((dayName, index) => <td key={index} className={index === 0 ? 'color-red' : 'color-grey'}>{dayName}</td>)}
      </tr>
    </thead>
  </table>
}

export default CalendarHeader;