/**
 * External dependencies
 */

import React from 'react';
import { connect } from 'react-redux';
const { app } = require( 'electron' ).remote;

/**
 * Internal dependencies
 */

import Input from 'component/input';
import { gotoStage, pickSshKey } from 'state/config/action';
import { STAGE_GATHER_ADVANCED, STAGE_DOWNLOAD } from 'state/config/type';

function shortenPath( path ) {
	return path.replace( app.getPath( 'home' ), '~' );
}

const GatherBasic = ( props ) => {
	const { settings, onNext, onBack, onPickSSH } = props;

	return (
		<div className="home">
			<header>
				<h1>Basic Setup</h1>
			</header>

			<main>
				<p>These settings allow you to connect to your Pi after it boots. Leave blank if you don't need wifi.</p>

				<table className="gather">
					<tbody>
						<tr><th>Wifi Network</th><td><Input value={ settings.wifiNetwork } name="wifiNetwork" /></td></tr>
						<tr><th>Wifi Password</th><td><Input value={ settings.wifiPassword } name="wifiPassword" /></td></tr>
					</tbody>
				</table>

				<p>Optionally supply your SSH public key to login without a password.</p>
				<table className="gather">
					<tbody>
						<tr>
							<th>Public SSH key</th>
							<td>
								<button className="button-small" onClick={ onPickSSH }>Select</button>
								{ settings.sshKey ? <p>{ shortenPath( settings.sshKey ) }</p> : false }
							</td>
						</tr>
					</tbody>
				</table>

				<p>Need more <a href="https://github.com/Automattic/biab-installer" rel="noopener noreferrer" target="_blank">help?</a></p>
			</main>

			<footer>
				<button onClick={ onBack }>&laquo; Go Back</button>
				<button onClick={ onNext }>Continue!</button>
			</footer>
		</div>
	);
};

function mapDispatchToProps( dispatch ) {
	return {
		onNext: () => {
			dispatch( gotoStage( STAGE_GATHER_ADVANCED ) );
		},
		onBack: () => {
			dispatch( gotoStage( STAGE_DOWNLOAD ) );
		},
		onPickSSH: () => {
			dispatch( pickSshKey() );
		}
	};
}

function mapStateToProps( state ) {
	const { settings } = state.config;

	return {
		settings,
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( GatherBasic );
