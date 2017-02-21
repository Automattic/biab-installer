/**
 * External dependencies
 */

import React from 'react';
import { connect } from 'react-redux';
import prettysize from 'prettysize';

/**
 * Internal dependencies
 */

import { gotoStage } from 'state/config/action';
import { STAGE_GATHER_ADVANCED, STAGE_BURN } from 'state/config/type';
import { showDriveSelector } from 'state/drive/action';
import { getSelectedDrive, getDriveName } from 'state/drive/selector';
import DriveList from 'component/drivelist';

const SelectDrive = ( props ) => {
	const { showing, selectedDrive, onShowDriveSelector, onBack, onNext } = props;
	const selected = selectedDrive ? getDriveName( selectedDrive ) + ' - ' + prettysize( selectedDrive.size ) : 'No drive selected';

	return (
		<div className="home">
			<header>
				<h1>Preparing To Burn</h1>
			</header>

			<main>
				<h2>Drive</h2>
				{ showing && <DriveList /> }

				<p>{ selected }</p>
				<p><button onClick={ onShowDriveSelector }>Change Drive</button></p>
			</main>

			<footer>
				<button onClick={ onBack }>Go Back</button>
				<button onClick={ onNext } disabled={ ! selectedDrive }>Burn It</button>
			</footer>
		</div>
	);
};

function mapDispatchToProps( dispatch ) {
	return {
		onShowDriveSelector: () => {
			dispatch( showDriveSelector() );
		},
		onNext: () => {
			dispatch( gotoStage( STAGE_BURN ) );
		},
		onBack: () => {
			dispatch( gotoStage( STAGE_GATHER_ADVANCED ) );
		}
	};
}

function mapStateToProps( state ) {
	const { showing, selected, available } = state.drive;

	return {
		showing,
		selectedDrive: getSelectedDrive( available, selected ),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( SelectDrive );
