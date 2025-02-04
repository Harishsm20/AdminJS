import React from "react";

const TimePickerShow = (props) => {
  const { property, record } = props;
  const value = record.params[property.path] || "Not Set";

  return <span>{value}</span>;
};

export default TimePickerShow;
