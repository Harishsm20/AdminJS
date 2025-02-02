import React, { useEffect, useRef } from "react";
import Flatpickr from "flatpickr";
import "flatpickr/dist/themes/light.css"; // You can change theme if needed

const TimePicker = ({ onChange, property, record }) => {
  const inputRef = useRef(null);
  const value = record?.params?.[property.path] || "";

  useEffect(() => {
    if (inputRef.current) {
      Flatpickr(inputRef.current, {
        enableTime: true,
        noCalendar: true, // Only show time picker
        dateFormat: "H:i", // 24-hour format
        time_24hr: true,
        onChange: (selectedDates, dateStr) => {
          onChange(property.path, dateStr);
        },
      });
    }
  }, []);

  return <input ref={inputRef} defaultValue={value} />;
};

export default TimePicker;
