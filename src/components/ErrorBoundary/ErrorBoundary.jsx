import React, { Component } from 'react';
import {
	ErrorImageContainer,
	ErrorImageOverlay,
	ErrorImageText,
} from './ErrorBoundary.styles';

export default class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		// this state object let us know any of the children component throws an error
		this.state = {
			hasError: false,
		};
	}

	// This methods needs to be setup so that
	// it can capture that error has occurred in any child component
	static getDerivedStateFromError(error) {
		// process the error
		return { hasError: true };
	}

	componentDidCatch(error, info) {
		console.log(error);
	}

	render() {
		if (this.state.hasError)
			return (
				<ErrorImageOverlay>
					<ErrorImageContainer imageUrl='https://i.imgur.com/yW2W9SC.png' />
					<ErrorImageText>Sorry, This page is broken</ErrorImageText>
				</ErrorImageOverlay>
			);

		return this.props.children;
	}
}
