/* global document */
/**
 * External dependencies
 */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

/**
 * Internal dependencies
 */

import createReduxStore from 'state';
import Home from 'component/home';
import { getInitialState } from 'state/initial';
import './index.scss';

render(
	<Provider store={ createReduxStore( getInitialState() ) }>
		<Home />
	</Provider>,

	document.getElementById( 'app' )
);
