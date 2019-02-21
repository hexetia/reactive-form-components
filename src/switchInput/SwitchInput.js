import * as React from "react";
import { Switch, FormControlLabel, FormGroup as MuiFormGroup } from "@material-ui/core";
export const SwitchInput = (control) => {
    const { label, checked, value, ...meta } = control.meta;
    return (React.createElement(MuiFormGroup, null,
        React.createElement(FormControlLabel, { label: label, checked: checked, control: React.createElement(Switch, Object.assign({}, control.handler("checkbox"), meta)) })));
};
//# sourceMappingURL=SwitchInput.js.map