import { useMemo } from 'react';

const useDateInfo = () => {
  return useMemo(() => {
    const daysOfMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date();
    const dayPlus4 = (date.getDay() + 4) % 7;
    const dayNamePlus4 = daysOfWeek[dayPlus4];
    const month = daysOfMonth[date.getMonth()];

    return {
      currentMonth: month,
      deliveryDay: dayNamePlus4,
      currentDate: date?.getDate(),
    };
  }, []);
};

export default useDateInfo;
