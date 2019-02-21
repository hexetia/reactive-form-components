import React from 'react';
import { TextField } from '@material-ui/core';
import { preventInputNumber } from 'prevent-input-number';
import { FormatOnBlur } from "../_helpers/FormatOnBlur";
export const TextInput = (c) => {
    const control = c;
    console.log('control', control);
    const { capitalizeOnBlur, formatCpfOnBlur, preventNumber, showCharsCount, alwaysShowCharsCount, attachMaxLength, errorMessages, helperText, dontAwaitTouchForError, onKeyDown, ...restOfMeta } = control.meta;
    let errorsRendered = null;
    if (errorMessages !== undefined && control.errors !== null && control.errors !== undefined) {
        errorsRendered = Object.keys(control.errors).map((messageKey) => {
            return (React.createElement("span", { style: { display: 'block' }, key: messageKey }, errorMessages[messageKey]));
        });
    }
    const { onBlur, ...controlHandler } = { ...control.handler() };
    let closeToMaxLength = false;
    if (control.value !== undefined && control.meta.inputProps.maxLength !== undefined) {
        const thirtyPercentLen = (control.meta.inputProps.maxLength * 30) / 100;
        const currentRelativeLen = control.meta.inputProps.maxLength - control.value.length;
        if (thirtyPercentLen >= currentRelativeLen) {
            closeToMaxLength = true;
        }
    }
    return (React.createElement(TextField, Object.assign({}, controlHandler, restOfMeta, { onBlur: e => {
            if (capitalizeOnBlur) {
                FormatOnBlur.capitalizeOnBlur(control);
            }
            else {
                if (onBlur !== undefined) {
                    onBlur(e);
                }
            }
        }, onKeyDown: onKeyDown ? onKeyDown : preventNumber ? preventInputNumber : undefined, error: (control.touched && control.errors !== null) || (dontAwaitTouchForError && control.errors !== null), FormHelperTextProps: { component: 'div' }, helperText: React.createElement(React.Fragment, null,
            React.createElement("span", { style: { display: 'block' } },
                ((showCharsCount && closeToMaxLength) || alwaysShowCharsCount) && (React.createElement("div", { className: "lineCounter" },
                    React.createElement("div", null,
                        control.value.length,
                        "/",
                        control.meta.inputProps.maxLength))),
                (!control.touched || (control.touched && errorsRendered === null)) && (helperText),
                (control.touched && [errorsRendered]) || (dontAwaitTouchForError && [errorsRendered]))) })));
};
//# sourceMappingURL=TextInput.js.map