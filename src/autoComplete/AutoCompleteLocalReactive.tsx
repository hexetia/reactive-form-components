import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton, MenuItem, Paper, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Control } from '../_defs/Control';
import { FormGroup, FormArray, FormControl as ReactiveFormControl } from 'react-reactive-form';
import {renderAutoCompleteInput} from "./AutoCompleteTextField";

export const AutoCompleteLocalReactive = (props: Props) => (control: FormGroup | FormArray | ReactiveFormControl) => {
	return <AutoCompleteLocalReactiveX control={control as any} {...props} />;
};

type SetSuggestionsHook = (suggestions: string[]) => void;
interface AutoSuggestRenderParams {
	query: string;
	isHighlighted: boolean;
}

function deleteItemFromLocalStorage(
	localStorageKey: string,
	setSuggestions: SetSuggestionsHook,
	suggestion: string
): void {
	// o usuário pode ter aberto a janela de sugestões numa aba e deletado noutra aba
	// e depois vir tentar deletar nessa aba de novo, é um edge caso do caralho
	const rawItems = localStorage.getItem(localStorageKey);
	if (rawItems == null) {
		return;
	}

	const items = JSON.parse(rawItems) as string[];
	const index = items.indexOf(suggestion);
	if (index !== -1) {
		items.splice(index, 1);
	}
	localStorage.setItem(localStorageKey, JSON.stringify(items));
	setSuggestions(items);
}

export function saveAutocompleteItem(localStorageKey: string, value: string) {
	const rawItems = localStorage.getItem(localStorageKey);
	if (rawItems != null) {
		const items = JSON.parse(rawItems) as string[];
		const possivelNovaEscola = value.trim();
		if (!items.includes(possivelNovaEscola)) {
			items.push(possivelNovaEscola);
		}

		localStorage.setItem(localStorageKey, JSON.stringify(items));
	} else {
		localStorage.setItem(localStorageKey, JSON.stringify([value.trim()]));
	}
}

const defaultRenderSuggestion = (localStorageKey: string, setSuggestions: SetSuggestionsHook) => (
	suggestion: string,
	{ query, isHighlighted }: AutoSuggestRenderParams
) => {
	return (
		<MenuItem selected={isHighlighted} component="div" style={{ position: 'relative' }}>
            <span key={suggestion} style={{ fontWeight: isHighlighted ? 500 : 300 }}>
                {suggestion}
            </span>
			<IconButton
				style={{ position: 'absolute', right: 4 }}
				onClick={e => {
					e.preventDefault();
					e.stopPropagation();
					deleteItemFromLocalStorage(localStorageKey, setSuggestions, suggestion);
				}}
			>
				<CloseIcon />
			</IconButton>
		</MenuItem>
	);
};

function renderSuggestionsContainer(options: any) {
	const { containerProps, children } = options;

	return (
		<Paper {...containerProps} square style={{ zIndex: 100 }}>
			{children}
		</Paper>
	);
}

function getSuggestionValue(suggestion: any): any {
	return suggestion;
}

const useStyles = makeStyles((theme: Theme) => ({
	container: {
		flexGrow: 1,
		position: 'relative'
		// height: 60,
	},
	defaultMarginSuggestionsContainerOpen: {
		marginTop: -28
	},
	marginSuggestionsContainerOpenWithoutHelperText: {
		marginTop: -7
	},
	suggestionsContainerOpen: {
		position: 'absolute',
		marginBottom: theme.spacing(3),
		left: 0,
		right: 0
	},
	suggestion: {
		display: 'block'
	},
	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: 'none'
	}
}));

interface Props {
	localStorageKey: string; // URL usada para pegar os resultados das sugest'oes
	className?: string;
	inputClassName?: string;
}

const AutoCompleteLocalReactiveX = (props: Props & Control) => {
	const classes = useStyles();
	const [suggestions, setSuggestions] = useState<string[]>([]);

	const handleSuggestionsFetchRequested = ({ value }: { value: string }) => {
		let count = 0;
		const inputValue = value.trim().toLowerCase();
		const itemsOnStorage = localStorage.getItem(props.localStorageKey);

		if (itemsOnStorage == null) {
			return;
		}

		let items = JSON.parse(itemsOnStorage).filter((item: string) => {
			if (item.toLowerCase().startsWith(inputValue)) {
				count++;

				return item;
			}
		});

		count > 0 ? setSuggestions(items) : void 0;
	};

	const handleSuggestionsClearRequested = () => {
		setSuggestions([]);
	};

	const handleChange = (event: React.FormEvent, { newValue, method }: { newValue: string; method: string }) => {
		if (method === 'enter') {
			event.preventDefault();
		}

		console.log('newValue', newValue);

		props.control.onChange(newValue);
	};

	return (
		<Autosuggest
			theme={{
				container: `${classes.container} ${typeof props.className !== undefined ? props.className : ''}`,
				suggestionsContainerOpen: `${classes.suggestionsContainerOpen} ${
					props.control.meta.helperText
						? classes.defaultMarginSuggestionsContainerOpen
						: classes.marginSuggestionsContainerOpenWithoutHelperText
					}`,
				suggestionsList: classes.suggestionsList,
				suggestion: classes.suggestion
			}}
			highlightFirstSuggestion={true}
			renderInputComponent={renderAutoCompleteInput(props.control)}
			suggestions={suggestions}
			onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
			onSuggestionsClearRequested={handleSuggestionsClearRequested}
			alwaysRenderSuggestions={false} // util pra fazer debug
			renderSuggestionsContainer={renderSuggestionsContainer}
			getSuggestionValue={getSuggestionValue}
			renderSuggestion={defaultRenderSuggestion(props.localStorageKey, setSuggestions)}
			inputProps={{
				value: props.control.value,
				onChange: handleChange
			}}
		/>
	);
};
