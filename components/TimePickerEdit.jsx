import React from "react";
import { BasePropertyComponent } from "adminjs";
import { FormGroup, Label, Input } from "@adminjs/design-system";

const TimePickerEdit = (props) => {
  const { onChange, property, record } = props;
  const value = record.params[property.path] || "";

  return (
    <FormGroup>
      <Label>{property.label}</Label>
      <Input
        type="time"
        value={value}
        onChange={(e) => onChange(property.path, e.target.value)}
      />
    </FormGroup>
  );
};

export default TimePickerEdit;
