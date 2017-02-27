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
				<p align="center">
					<svg width="96" height="233" viewBox="0 0 96 233" xmlns="http://www.w3.org/2000/svg"><title>Logo</title><g fill="none" fillRule="evenodd"><g><g><path d="M0 221.667c0 5.866 4.8 10.666 10.667 10.666h74.666c5.867 0 10.667-4.8 10.667-10.666v-69.334H0v69.334zm64-48c0 5.866-4.8 10.666-10.667 10.666H42.667c-5.867 0-10.667-4.8-10.667-10.666h32z" fill="#FFF" fillRule="nonzero" /><path d="M-16 115h128v128H-16z" /></g><g><path d="M24 88h48v48H24z" /><path d="M48 92c-11.046 0-20 8.954-20 20s8.954 20 20 20 20-8.954 20-20-8.954-20-20-20zm-17 20c0-2.464.528-4.804 1.472-6.92l8.108 22.22C34.912 124.544 31 118.73 31 112zm17 17c-1.668 0-3.28-.24-4.8-.69l5.1-14.82 5.226 14.314c.034.084.076.16.12.234-1.768.62-3.666.96-5.646.96V129zm2.344-24.97c1.024-.054 1.946-.16 1.946-.16.916-.11.808-1.456-.108-1.404 0 0-2.752.216-4.53.216-1.67 0-4.48-.214-4.48-.214-.916-.052-1.02 1.348-.106 1.4 0 0 .868.11 1.784.164l2.648 7.26-3.72 11.156-6.192-18.416c1.024-.054 1.946-.16 1.946-.16.916-.11.806-1.456-.11-1.404 0 0-2.752.216-4.53.216-.32 0-.694-.006-1.094-.02C36.836 98.05 42.06 95 48 95c4.426 0 8.456 1.692 11.48 4.464-.074-.004-.144-.014-.22-.014-1.67 0-2.854 1.454-2.854 3.02 0 1.4.808 2.584 1.67 3.986.646 1.132 1.4 2.586 1.4 4.688 0 1.454-.56 3.144-1.292 5.496l-1.696 5.666-6.144-18.276zm6.2 22.664l5.194-15.012c.968-2.424 1.29-4.36 1.29-6.088 0-.626-.04-1.206-.114-1.748 1.328 2.42 2.084 5.2 2.084 8.156 0 6.272-3.4 11.748-8.454 14.694v-.002z" fill="#191E23" fillRule="nonzero" /></g><g><path d="M48-6h48v48H48z" /><path d="M90 16v16c0 2.21-1.79 4-4 4H58c-2.21 0-4-1.79-4-4V4c0-2.21 1.79-4 4-4h16l-4 4H58v28h28V20l4-4zM62 28h6l15-15-6-6-15 15v6zM81.88 2.12L79 5l6 6 2.88-2.88c1.17-1.17 1.17-3.07 0-4.24l-1.76-1.76c-1.17-1.17-3.07-1.17-4.24 0z" fill="#191E23" fillRule="nonzero" /></g><g><path d="M7 38h48v48H7z" /><path d="M43 56c-.02 0-.034.004-.05.006C42.44 49.292 36.844 44 30 44c-7.18 0-13 5.82-13 13 0 1.048.14 2.06.372 3.04-.126-.01-.244-.04-.372-.04-4.42 0-8 3.58-8 8 0 2.404 1.08 4.534 2.76 6h37.186C51.392 72.18 53 69.286 53 66c0-5.52-4.48-10-10-10z" fill="#191E23" fillRule="nonzero" /></g></g></g></svg>
				</p>

				<p>A quick and easy way of putting WordPress onto a Raspberry Pi.<br />
				All you need is an SD card!</p>
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
