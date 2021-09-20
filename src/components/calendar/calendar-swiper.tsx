import { useCallback, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';

import 'swiper/swiper.min.css'
import { usePaymentDispatch } from '../../context';
import MonthCalendar from './month-calendar';

const months = new Array(24).fill(0).map((_, index) => {
  const currentMonth = new Date().getMonth();
  const date = new Date();
  date.setMonth(currentMonth - index);
  return {
    year: date.getFullYear(),
    month: date.getMonth()
  }
}).reverse();

function CalendarSwiper() {
  const dispatch = usePaymentDispatch();
  const onSlideChange = useCallback((swiper: SwiperCore) => {
    const setYearMonth = (year: number, month: number) => dispatch({ type: 'CALENDAR/SET_DATE', year, month })
    const { year, month } = months[swiper.realIndex];
    setYearMonth(year, month);
  }, []);

  return (
    <Swiper
      spaceBetween={50}
      onSlideChange={onSlideChange}
      initialSlide={months.length - 1}
    >
      {months.map(({ year, month }, index) => {
        return <SwiperSlide virtualIndex={index} key={index}>
          <MonthCalendar year={year} month={month} />
        </SwiperSlide>
      })}
    </Swiper>
  );
}

export default CalendarSwiper;