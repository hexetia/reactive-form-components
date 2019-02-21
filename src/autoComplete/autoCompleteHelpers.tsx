import React from "react";
import { MenuItem, Paper } from "@material-ui/core";

const methods = ["down", "up", "escape", "enter", "click", "type"];

export interface AutoSuggestOnChange {
	newValue: any;
	method: keyof typeof methods;
}

export interface AutoSuggestSuggestionSelected {
	suggestion: any;
	suggestionValue: any;
	suggestionIndex: number;
	sectionIndex: number;
	method: keyof typeof methods;
}

interface AutoSuggestRenderSuggestionParams {
	isHighlighted: boolean;
}

export const newDefaultRenderSuggestion = (suggestionKey: any) => (
	suggestion: any,
	{ isHighlighted }: AutoSuggestRenderSuggestionParams
) => {
	return (
		<MenuItem selected={isHighlighted} component="div">
			<span key={suggestion.id} style={{ fontWeight: isHighlighted ? 500 : 300 }}>
				{suggestion[suggestionKey]}
			</span>
		</MenuItem>
	);
};

export const defaultRenderSuggestion = (context: any, suggestionKey: any) => (
	suggestion: any,
	{ isHighlighted }: AutoSuggestRenderSuggestionParams
) => {
	return (
		<MenuItem selected={isHighlighted} component="div">
			<span key={suggestion.id} style={{ fontWeight: isHighlighted ? 500 : 300 }}>
				{suggestion[suggestionKey]}
			</span>
		</MenuItem>
	);
};

export function renderSuggestionsContainer(options: any) {
	const { containerProps, children } = options;

	return (
		<Paper {...containerProps} square style={{ zIndex: 100 }}>
			{children}
		</Paper>
	);
}

export function getSuggestionValue(suggestion: any) {
	return suggestion;
}

export interface Cidade {
	id: number;
	nome: string;
	uf: string
}

export const newRenderCidadeSuggestion = (suggestion: Cidade, {isHighlighted}: any) => (
	<MenuItem selected={isHighlighted} component="div">
			<span key={suggestion.id} style={{ fontWeight: isHighlighted ? 500 : 300 }}>
				{suggestion.nome} - {suggestion.uf}
			</span>
	</MenuItem>
)

export const renderCidadeSuggestion = (context: any) => (suggestion: Cidade, {isHighlighted}: any) => (
	<MenuItem selected={isHighlighted} component="div">
			<span key={suggestion.id} style={{ fontWeight: isHighlighted ? 500 : 300 }}>
				{suggestion.nome} - {suggestion.uf}
			</span>
		</MenuItem>
)