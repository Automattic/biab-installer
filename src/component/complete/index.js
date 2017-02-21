/**
 * External dependencies
 */

import React from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { gotoStage } from 'state/config/action';
import { STAGE_SELECT_DRIVE } from 'state/config/type';

const Complete = ( props ) => {
	const { onAgain, settings, versionWP } = props;

	return (
		<div className="home">
			<header>
				<h1>Burn Complete!</h1>
			</header>

			<main>
				<p>A working copy of WordPress { versionWP } has been installed on your SD card.</p>

				<h2>What happens next?</h2>
				<ul>
					<li>Remove the SD card</li>
					<li>Insert into your Raspberry Pi (optionally attach a monitor to the Pi)</li>
					<li>Start your Raspberry Pi</li>
					<li>Your Pi will reboot several times to finish installation - wait until this has complete</li>
					<li>Connect to <a href={ 'http://' + settings.hostname + '.local' } rel="noopener noreferrer" target="_blank">{ settings.hostname }.local</a></li>
				</ul>
			</main>

			<footer>
				<button onClick={ onAgain }>Burn Another</button>
			</footer>
		</div>
	);
};

function mapDispatchToProps( dispatch ) {
	return {
		onAgain: () => {
			dispatch( gotoStage( STAGE_SELECT_DRIVE ) );
		}
	};
}

function mapStateToProps( state ) {
	const { settings, versionWP } = state.config;

	return {
		settings,
		versionWP,
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( Complete );
