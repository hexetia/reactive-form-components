import * as React from "react";
import { FormControlLabel, FormGroup as MuiFormGroup } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
export const CheckboxInput = (control) => {
    const { value, ...handlerWithoutValue } = { ...control.handler("checkbox") };
    const { label, checked, ...meta } = control.meta;
    return (React.createElement(MuiFormGroup, null,
        React.createElement(FormControlLabel, { label: label, checked: checked, control: React.createElement(Checkbox, Object.assign({}, handlerWithoutValue, meta)) })));
};
//# sourceMappingURL=CheckboxInput.js.map