/**
 * External dependencies
 */

import React from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import EditableInput from 'component/input/editable';
import EditablePassword from 'component/input/password';
import { gotoStage } from 'state/config/action';
import { STAGE_GATHER_BASIC, STAGE_SELECT_DRIVE } from 'state/config/type';

const GatherAdvanced = ( props ) => {
	const { settings, onNext, onBack, validity } = props;

	return (
		<div className="home">
			<header>
				<h1>Advanced Setup</h1>
			</header>

			<main className="two-column">
				<p className="tagline">These auto-generated settings will be used - they can be edited.</p>

				<div className="gather-left">
					<h2>Blog Settings</h2>
					<table className="gather">
						<tbody>
							<tr>
								<th>Title</th>
								<td><EditableInput value={ settings.wpTitle } name="wpTitle" /></td>
							</tr>
							<tr>
								<th>Email</th>
								<td><EditableInput value={ settings.wpEmail } name="wpEmail" inputType="email" /></td>
							</tr>
							<tr>
								<th>Login</th>
								<td>
									<EditableInput value={ settings.wpUsername } name="wpUsername" />
								</td>
							</tr>
							<tr>
								<th>Password</th>
								<td>
									<EditablePassword value={ settings.wpPassword } name="wpPassword" />
								</td>
							</tr>
						</tbody>
					</table>

					<h2>MySQL Settings</h2>
					<table className="gather">
						<tbody>
							<tr>
								<th>Root Password</th>
								<td><EditablePassword value={ settings.mysqlRootPassword } name="mysqlRootPassword" /></td>
							</tr>
							<tr>
								<th>WordPress User</th>
								<td>
									<EditableInput value={ settings.mysqlWpUser } name="mysqlWpUser" />
								</td>
							</tr>
							<tr>
								<th>WordPress Password</th>
								<td>
									<EditablePassword value={ settings.mysqlWpPassword } name="mysqlWpPassword" />
								</td>
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
								<td><EditableInput value={ settings.hostname } name="hostname" /></td>
							</tr>
							<tr>
								<th>Pi Login Password</th>
								<td><EditablePassword value={ settings.piPassword } name="piPassword" /></td>
							</tr>
							<tr>
								<th>Samba Share</th>
								<td><EditableInput value={ settings.samba } name="samba" /></td>
							</tr>
							<tr>
								<th>Timezone</th>
								<td><EditableInput value={ settings.timezone } name="timezone" /></td>
							</tr>
						</tbody>
					</table>
				</div>
			</main>

			<footer>
				<button onClick={ onBack }>&laquo; Go Back</button>
				<button onClick={ onNext } disabled={ validity.length > 0 }>Continue!</button>
			</footer>
		</div>
	);
};

function mapDispatchToProps( dispatch ) {
	return {
		onNext: () => {
			dispatch( gotoStage( STAGE_SELECT_DRIVE ) );
		},
		onBack: () => {
			dispatch( gotoStage( STAGE_GATHER_BASIC ) );
		}
	};
}

function mapStateToProps( state ) {
	const { settings, validity } = state.config;

	return {
		settings,
		validity,
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( GatherAdvanced );
