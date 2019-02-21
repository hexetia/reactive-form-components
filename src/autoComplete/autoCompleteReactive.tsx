import React from 'react';
import { Theme} from '@material-ui/core';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import {renderAutoCompleteInput} from "./AutoCompleteTextField";
import {
    renderSuggestionsContainer,
    getSuggestionValue,
    AutoSuggestOnChange,
    AutoSuggestSuggestionSelected,
    newDefaultRenderSuggestion
} from './autoCompleteHelpers';
import getValue from 'get-value';
import classnames from 'clsx';
import { isUndefined, isString } from 'util';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { FormGroup, FormArray, FormControl as ReactiveFormControl } from 'react-reactive-form';
import debounce from 'debounce';

export const AutoCompleteReactive = (props: AutoCompleteProps) => (
    control: FormGroup | FormArray | ReactiveFormControl
) => {
    return <AutoCompleteReactiveRemoteX control={control as ReactiveFormControl} {...props} />;
};

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        flexGrow: 1,
        position: 'relative'
        // height: 60,
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        marginBottom: theme.spacing.unit * (3),
        left: 0,
        right: 0
    },
    'containerWithHelperTextMargin-normal': {
        marginTop: -27
    },
    'containerWithHelperTextMargin-dense': {
        marginTop: -20
    },
    'containerWithHelperTextMargin-none': {
        marginTop: -20
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

export interface Control {
    control: ReactiveFormControl;
}

interface AutoCompleteProps {
    endpoint: string;
    renderSuggestion: any;
    formatter<T>(suggesion: T): string;
    suggestionKey?: string;
    margin?: 'normal' | 'dense' | 'none';
}

const AutoCompleteReactiveRemoteX = (props: AutoCompleteProps & Control) => {
    const classes = useStyles();
    const [localValue, setLocalValue] = useState<string>(props.formatter(props.control.value));
    const [suggestions, setSuggestions] = useState<string[]>([]);

    // const debouncedOnChange = debounce(props.control.onChange, 200);
    let currentReq = 0;

    useEffect(() => {
        if (typeof props.control.value !== 'undefined') {
            setLocalValue(props.formatter(props.control.value));
        }
    }, [props.control.value]);

    const _handleSuggestionsFetchRequested = ({ value }: { value: string }) => {
        if (value.trim() !== '') {
            const localReqId = Math.random();
            currentReq = localReqId;
            axios
                .get(`${props.endpoint}&startWith=${value}`)
                .then(response => {
                    if (currentReq === localReqId) {
                        if (typeof response.data === 'object' && response.data !== undefined) {
                          setSuggestions(response.data.content);
                        }
                    }
                })
                .catch(error => {});
        }
    };

    const handleSuggestionsFetchRequestedDebounced = debounce(_handleSuggestionsFetchRequested, 200);

    const handleChange = (event: Event, { newValue, method }: AutoSuggestOnChange) => {
        console.log('method', method, newValue, typeof newValue);
        if (method === 'enter') {
            event.preventDefault(); // evita que o formulário seja enviado durante a seleção de um dos itens
        }

        if (typeof newValue === 'string' && props.control.value !== undefined) {
            props.control.onChange(undefined);
            setLocalValue(newValue);
        } else {
            setLocalValue(props.formatter(newValue));
        }
    };

    const handleSuggestionSelected = (event: Event, { suggestion }: AutoSuggestSuggestionSelected) => {
        setLocalValue(props.formatter(suggestion));
        props.control.onChange(suggestion);
    };

    const handleSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    let fieldValue = '';
    if (isUndefined(props.control.value) || isString(props.control.value)) {
        fieldValue = localValue;
    } else {
        fieldValue = props.formatter(props.control.value);
    }

    const margin = !isUndefined(props.margin) ? props.margin : 'normal';

    return (
        <Autosuggest
            theme={{
                container: classes.container,
                suggestionsContainerOpen: classnames(classes.suggestionsContainerOpen, {
                    // @ts-ignore
                    [classes[`containerWithHelperTextMargin-${margin}`]]:
                        getValue(props.control.meta, 'helperText', { default: false }) !== false
                }),
                suggestionsList: classes.suggestionsList,
                suggestion: classes.suggestion
            }}
            highlightFirstSuggestion={true}
            onSuggestionSelected={handleSuggestionSelected}
            // renderInputComponent={renderInput}
            renderInputComponent={renderAutoCompleteInput(props.control)}
            suggestions={suggestions}
            onSuggestionsFetchRequested={handleSuggestionsFetchRequestedDebounced}
            onSuggestionsClearRequested={handleSuggestionsClearRequested}
            // alwaysRenderSuggestions={true} // util pra fazer debug
            renderSuggestionsContainer={renderSuggestionsContainer}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={
                props.renderSuggestion !== undefined
                    ? props.renderSuggestion
                    : newDefaultRenderSuggestion(props.suggestionKey)
            }
            inputProps={{
                value: fieldValue,
                onChange: handleChange,
                margin: margin
            }}
        />
    );
};
