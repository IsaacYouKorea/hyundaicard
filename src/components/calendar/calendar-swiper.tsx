import { useCallback, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';

import 'swiper/swiper.min.css'
import { usePaymentDispatch, usePaymentState } from '../../context';
import MonthCalendar from './month-calendar';
import { monthsBefore } from '../../util/date';

const months = monthsBefore();

function CalendarSwiper() {
  const [swiper, setSwiper] = useState<SwiperCore>();

  const state = usePaymentState();
  const dispatch = usePaymentDispatch();
  const onSlideChange = useCallback((swiper: SwiperCore) => {
    const setYearMonth = (year: number, month: number) => dispatch({ type: 'CALENDAR/SET_DATE', year, month, day: state.date.day })
    const { year, month } = months[swiper.realIndex];
    setYearMonth(year, month);
  }, [state.date.day, dispatch]);

  useEffect(() => {
    const targetIndex = months.findIndex((month) => month.year === state.date.year && month.month === state.date.month);
    swiper?.slideTo(targetIndex);
  }, [state.date, swiper])

  return (
    <Swiper
      spaceBetween={50}
      onSlideChange={onSlideChange}
      initialSlide={months.length - 1}
      onSwiper={(swiper) => setSwiper(swiper)}
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