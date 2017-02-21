/**
 * External dependencies
 */

import React from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import Input from 'component/input';
import { gotoStage } from 'state/config/action';
import { STAGE_GATHER_ADVANCED, STAGE_DOWNLOAD } from 'state/config/type';

const GatherBasic = ( props ) => {
	const { settings, onNext, onBack } = props;

	return (
		<div className="home">
			<header>
				<h1>Basic Setup</h1>
			</header>

			<main>
				<p>These basic settings allow you to connect to your Pi after it boots.</p>

				<table className="gather">
					<tbody>
						<tr><th>Wifi Network</th><td><Input value={ settings.wifiNetwork } name="wifiNetwork" /></td></tr>
						<tr><th>Wifi Password</th><td><Input value={ settings.wifiPassword } name="wifiPassword" /></td></tr>
					</tbody>
				</table>

				<p>Supply your SSH public key to login without a password.</p>
				<table className="gather">
					<tbody>
						<tr><th>Public SSH key</th><td><Input value={ settings.sshKey } name="sshKey" /></td></tr>
					</tbody>
				</table>

				<p className="explain">You can usually find your key in somewhere like <code>~/.ssh/id_rsa.pub</code></p>
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
