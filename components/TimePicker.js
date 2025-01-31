import React from "react";
import { Input } from "@adminjs/design-system";

const TimePicker = (props) => {
  const { onChange, property, record } = props;
  const value = record?.params?.[property.path] || "";

  return (
    <Input
      type="time" // Use a native time picker
      value={value}
      onChange={(e) => onChange(property.path, e.target.value)}
    />
  );
};

export default TimePicker;
