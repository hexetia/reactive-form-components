import React from "react";
import { MenuItem, Paper } from "@material-ui/core";
const methods = ["down", "up", "escape", "enter", "click", "type"];
export const newDefaultRenderSuggestion = (suggestionKey) => (suggestion, { isHighlighted }) => {
    return (React.createElement(MenuItem, { selected: isHighlighted, component: "div" },
        React.createElement("span", { key: suggestion.id, style: { fontWeight: isHighlighted ? 500 : 300 } }, suggestion[suggestionKey])));
};
export const defaultRenderSuggestion = (context, suggestionKey) => (suggestion, { isHighlighted }) => {
    return (React.createElement(MenuItem, { selected: isHighlighted, component: "div" },
        React.createElement("span", { key: suggestion.id, style: { fontWeight: isHighlighted ? 500 : 300 } }, suggestion[suggestionKey])));
};
export function renderSuggestionsContainer(options) {
    const { containerProps, children } = options;
    return (React.createElement(Paper, Object.assign({}, containerProps, { square: true, style: { zIndex: 100 } }), children));
}
export function getSuggestionValue(suggestion) {
    return suggestion;
}
export const newRenderCidadeSuggestion = (suggestion, { isHighlighted }) => (React.createElement(MenuItem, { selected: isHighlighted, component: "div" },
    React.createElement("span", { key: suggestion.id, style: { fontWeight: isHighlighted ? 500 : 300 } },
        suggestion.nome,
        " - ",
        suggestion.uf)));
export const renderCidadeSuggestion = (context) => (suggestion, { isHighlighted }) => (React.createElement(MenuItem, { selected: isHighlighted, component: "div" },
    React.createElement("span", { key: suggestion.id, style: { fontWeight: isHighlighted ? 500 : 300 } },
        suggestion.nome,
        " - ",
        suggestion.uf)));
//# sourceMappingURL=autoCompleteHelpers.js.map