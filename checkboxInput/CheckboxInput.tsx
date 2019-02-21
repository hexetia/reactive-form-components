import * as React from "react";
import { FormGroup, FormArray, FormControl as ReactiveFormControl } from "react-reactive-form";
import {
  FormControlLabel,
  FormGroup as MuiFormGroup
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";

export const CheckboxInput = (control: FormGroup | FormArray | ReactiveFormControl) => {
  const {value, ...handlerWithoutValue} = {...control.handler("checkbox")};
  const {label, checked, ...meta} = control.meta;

  return (
    <MuiFormGroup>
      <FormControlLabel label={label} checked={checked} control={<Checkbox {...handlerWithoutValue} {...meta} />} />
    </MuiFormGroup>
  );
};
