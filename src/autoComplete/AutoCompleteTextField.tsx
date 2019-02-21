import * as React from "react";
import { FormEvent } from "react";
import TextField from "@material-ui/core/TextField";
import {TextInput} from "../textInput/TextInput";

/**
 *
 * @param inputProps são as props que o react-autosuggest passa
 */
export function renderInput(inputProps: any) {
	const { InputProps, classes, ref, ...other } = inputProps;

	return (
		<TextField
			fullWidth
			InputProps={{
				inputRef: ref,
				// classes: {
				//   root: classes.inputRoot,
				// },
				...InputProps
			}}
			inputProps={{
				role: "presentation",
				autoComplete: "off"
			}}
			{...other}
		/>
	);
}

export const renderAutoCompleteInput = (control: any) => (inputProps: any) => {
	const newControl = { ...control };

	newControl.value = inputProps.value;
	newControl.meta.inputRef = inputProps.ref;

	// necessário pra manter a compatibilidade com o react-reactive-forms
	newControl.handler = () => ({
		onBlur: (e: FormEvent) => {
			if (inputProps.onBlur !== undefined) {
				inputProps.onBlur(e);
			}
			if (control.onBlur !== undefined) {
				control.onBlur(e);
			}
			if (control.meta.onBlur !== undefined) {
				control.meta.onBlur();
			}
		},
		onFocus: (e: FormEvent) => {
			if (inputProps.onFocus !== undefined) {
				inputProps.onFocus(e);
			}
			if (control.onFocus !== undefined) {
				control.onFocus(e);
			}
		},
		onChange: inputProps.onChange,
		onKeyDown: inputProps.onKeyDown,
		value: inputProps.value
	});

	// os items em meta subistituiem os handlers
	newControl.meta = {
		...newControl.meta,
		...{
			onBlur: (e: FormEvent) => {
				if (control.onBlur !== undefined) {
					inputProps.onBlur(e);
				}
				if (control.onBlur !== undefined) {
					control.onBlur(e);
				}
				if (control.meta.onBlur !== undefined) {
					control.meta.onBlur();
				}
			},
			onFocus: (e: FormEvent) => {
				if (inputProps.onFocus !== undefined) {
					inputProps.onFocus(e);
				}
				if (control.onFocus !== undefined) {
					control.onFocus(e);
				}
			},
			onChange: inputProps.onChange,
			onKeyDown: inputProps.onKeyDown,
			value: inputProps.value
		}
	};
	newControl.meta["aria-activedescendant"] = inputProps["aria-activedescendant"];
	newControl.meta["aria-autocomplete"] = inputProps["aria-autocomplete"];
	newControl.meta["aria-controls"] = inputProps["aria-controls"];
	newControl.meta["key"] = inputProps["key"];

	return TextInput(newControl);
};
