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

const ShowAgain = ( props ) => {
	const { onAgain, settings } = props;

	return (
		<div className="home">
			<header>
				<h1>Your Details</h1>
			</header>

			<main className="two-column">
				<div className="gather-left">
					<h2>Blog Settings</h2>
					<table className="gather">
						<tbody>
							<tr>
								<th>Title</th>
								<td><input type="text" value={ settings.wpTitle } readOnly="true" /></td>
							</tr>
							<tr>
								<th>Email</th>
								<td><input type="text" value={ settings.wpEmail } readOnly="true" /></td>
							</tr>
							<tr>
								<th>Login</th>
								<td><input type="text" value={ settings.wpUsername } readOnly="true" /></td>
							</tr>
							<tr>
								<th>Password</th>
								<td><input type="text" value={ settings.wpPassword } readOnly="true" /></td>
							</tr>
						</tbody>
					</table>

					<h2>MySQL Settings</h2>
					<table className="gather">
						<tbody>
							<tr>
								<th>Root Password</th>
								<td><input type="text" value={ settings.mysqlRootPassword } readOnly="true" /></td>
							</tr>
							<tr>
								<th>WordPress User</th>
								<td><input type="text" value={ settings.mysqlWpUser } readOnly="true" /></td>
							</tr>
							<tr>
								<th>WordPress Password</th>
								<td><input type="text" value={ settings.mysqlWpPassword } readOnly="true" /></td>
							</tr>
						</tbody>
					</table>
				</div>

				<div className="gather-right">
					<h2>Pi Settings</h2>
					<table className="gather">
						<tbody>
							<tr>
								<th>Hostname</th>
								<td><input type="text" value={ settings.hostname } readOnly="true" /></td>
							</tr>
							<tr>
								<th>Pi Login Password</th>
								<td><input type="text" value={ settings.piPassword } readOnly="true" /></td>
							</tr>
							<tr>
								<th>Samba Share</th>
								<td><input type="text" value={ settings.samba } readOnly="true" /></td>
							</tr>
							<tr>
								<th>Timezone</th>
								<td><input type="text" value={ settings.timezone } readOnly="true" /></td>
							</tr>
						</tbody>
					</table>
				</div>
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
		},
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
)( ShowAgain );
