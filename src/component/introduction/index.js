/* global confirm */
/**
 * External dependencies
 */

import React from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { gotoStage, clearAllData } from 'state/config/action';
import { STAGE_DOWNLOAD } from 'state/config/type';
import pkg from '../../../package.json';

const Trash = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20"><rect x="0" fill="none" width="16" height="16" /><g><path d="M5.9 13h4.3c.5 0 .9-.4 1-.9l.8-6.6H4l.9 6.6c.1.5.5.9 1 .9zM11 3c0-.6-.4-1-1-1H6c-.6 0-1 .4-1 1L3 4v1h10V4l-2-1zM9.5 4h-3c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h3c.3 0 .5.2.5.5s-.2.5-.5.5z" /></g></svg>
	);
};

const Introduction = ( props ) => {
	const { onClear, onNext } = props;
	const clearAll = () => confirm( 'Do you want to clear all downloads?' ) ? onClear() : false;

	return (
		<div className="home">
			<div className="clear-all">
				<a href="#" onClick={ clearAll }>
					<Trash />
				</a>
			</div>

			<header>
				<h1>Blog In A Box</h1>
			</header>

			<main>
				<img src="logo.png" width="100" />
				<p>A quick and easy way of putting WordPress onto a Raspberry Pi.</p>

				<p>All you need is an SD card!</p>
			</main>

			<footer>
				<button onClick={ onNext }>Start &raquo;</button>

				<div className="version">v{ pkg.version }</div>
			</footer>
		</div>
	);
};

function mapDispatchToProps( dispatch ) {
	return {
		onNext: () => {
			dispatch( gotoStage( STAGE_DOWNLOAD ) );
		},
		onClear: () => {
			dispatch( clearAllData() );
			return false;
		}
	};
}

export default connect(
	null,
	mapDispatchToProps
)( Introduction );
