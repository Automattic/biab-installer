/**
 * External dependencies
 */

import React from 'react';
import { connect } from 'react-redux';

import { hideDriveSelector, selectDrive } from 'state/drive/action';
import NoDrives from './no-drives';
import Drives from './drives';

const DriveList = ( props ) => {
	const { onHideDriveSelector, onSelectDrive, available, selected } = props;

	return (
		<div className="drive-container">
			<div className="drive-list">
				<h2>Select A Drive</h2>

				<div className="close-drivelist" onClick={ onHideDriveSelector }>&#10005;</div>

				{ available.length === 0 ? <NoDrives /> : <Drives available={ available } selected={ selected } onSelect={ onSelectDrive } /> }
			</div>
		</div>
	);
};

function mapDispatchToProps( dispatch ) {
	return {
		onHideDriveSelector: () => {
			dispatch( hideDriveSelector() );
		},
		onSelectDrive: device => {
			dispatch( selectDrive( device ) );
		}
	};
}

function mapStateToProps( state ) {
	const { available, selected } = state.drive;

	return {
		available,
		selected,
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( DriveList );
