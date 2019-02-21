import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton, MenuItem, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { renderAutoCompleteInput } from "./AutoCompleteTextField";
export const AutoCompleteLocalReactive = (props) => (control) => {
    return React.createElement(AutoCompleteLocalReactiveX, Object.assign({ control: control }, props));
};
function deleteItemFromLocalStorage(localStorageKey, setSuggestions, suggestion) {
    // o usuário pode ter aberto a janela de sugestões numa aba e deletado noutra aba
    // e depois vir tentar deletar nessa aba de novo, é um edge caso do caralho
    const rawItems = localStorage.getItem(localStorageKey);
    if (rawItems == null) {
        return;
    }
    const items = JSON.parse(rawItems);
    const index = items.indexOf(suggestion);
    if (index !== -1) {
        items.splice(index, 1);
    }
    localStorage.setItem(localStorageKey, JSON.stringify(items));
    setSuggestions(items);
}
export function saveAutocompleteItem(localStorageKey, value) {
    const rawItems = localStorage.getItem(localStorageKey);
    if (rawItems != null) {
        const items = JSON.parse(rawItems);
        const possivelNovaEscola = value.trim();
        if (!items.includes(possivelNovaEscola)) {
            items.push(possivelNovaEscola);
        }
        localStorage.setItem(localStorageKey, JSON.stringify(items));
    }
    else {
        localStorage.setItem(localStorageKey, JSON.stringify([value.trim()]));
    }
}
const defaultRenderSuggestion = (localStorageKey, setSuggestions) => (suggestion, { query, isHighlighted }) => {
    return (React.createElement(MenuItem, { selected: isHighlighted, component: "div", style: { position: 'relative' } },
        React.createElement("span", { key: suggestion, style: { fontWeight: isHighlighted ? 500 : 300 } }, suggestion),
        React.createElement(IconButton, { style: { position: 'absolute', right: 4 }, onClick: e => {
                e.preventDefault();
                e.stopPropagation();
                deleteItemFromLocalStorage(localStorageKey, setSuggestions, suggestion);
            } },
            React.createElement(CloseIcon, null))));
};
function renderSuggestionsContainer(options) {
    const { containerProps, children } = options;
    return (React.createElement(Paper, Object.assign({}, containerProps, { square: true, style: { zIndex: 100 } }), children));
}
function getSuggestionValue(suggestion) {
    return suggestion;
}
const useStyles = makeStyles((theme) => ({
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
        marginBottom: theme.spacing.unit * 3,
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
const AutoCompleteLocalReactiveX = (props) => {
    const classes = useStyles();
    const [suggestions, setSuggestions] = useState([]);
    const handleSuggestionsFetchRequested = ({ value }) => {
        let count = 0;
        const inputValue = value.trim().toLowerCase();
        const itemsOnStorage = localStorage.getItem(props.localStorageKey);
        if (itemsOnStorage == null) {
            return;
        }
        let items = JSON.parse(itemsOnStorage).filter((item) => {
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
    const handleChange = (event, { newValue, method }) => {
        if (method === 'enter') {
            event.preventDefault();
        }
        console.log('newValue', newValue);
        props.control.onChange(newValue);
    };
    return (React.createElement(Autosuggest, { theme: {
            container: `${classes.container} ${typeof props.className !== undefined ? props.className : ''}`,
            suggestionsContainerOpen: `${classes.suggestionsContainerOpen} ${props.control.meta.helperText
                ? classes.defaultMarginSuggestionsContainerOpen
                : classes.marginSuggestionsContainerOpenWithoutHelperText}`,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion
        }, highlightFirstSuggestion: true, renderInputComponent: renderAutoCompleteInput(props.control), suggestions: suggestions, onSuggestionsFetchRequested: handleSuggestionsFetchRequested, onSuggestionsClearRequested: handleSuggestionsClearRequested, alwaysRenderSuggestions: false, renderSuggestionsContainer: renderSuggestionsContainer, getSuggestionValue: getSuggestionValue, renderSuggestion: defaultRenderSuggestion(props.localStorageKey, setSuggestions), inputProps: {
            value: props.control.value,
            onChange: handleChange
        } }));
};
//# sourceMappingURL=AutoCompleteLocalReactive.js.map