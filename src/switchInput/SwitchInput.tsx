import * as React from "react";
import { FormGroup, FormArray, FormControl as ReactiveFormControl } from "react-reactive-form";
import {
  Switch,
  FormControlLabel,
  FormGroup as MuiFormGroup
} from "@material-ui/core";

export const SwitchInput = (control: FormGroup | FormArray | ReactiveFormControl) => {
  const { label, checked, value, ...meta }: any = control.meta;

  return (
    <MuiFormGroup>
      <FormControlLabel label={label} checked={checked} control={<Switch {...control.handler("checkbox")} {...meta} />} />
    </MuiFormGroup>
  );
};
