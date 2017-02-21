/**
 * External dependencies
 */

import React from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { getSelectedDrive } from 'state/drive/selector';
import { startBurn } from 'state/drive/action';
import { STATUS_ERROR, STATUS_BURNING_IMAGE, STATUS_BURNING_EXTRA } from 'state/drive/type';
import BurnImage from './burn-image';
import BurnError from './burn-error';

class Burn extends React.Component {
	constructor( props ) {
		super( props );

		this.props.onStartBurn( this.props.selectedDrive );
	}

	render() {
		const { selectedDrive, progress, burnStatus, errorReason } = this.props;

		if ( burnStatus === STATUS_BURNING_IMAGE || burnStatus === STATUS_BURNING_EXTRA ) {
			return <BurnImage progress={ progress } selectedDrive={ selectedDrive } finalising={ burnStatus === STATUS_BURNING_EXTRA } />;
		} else if ( burnStatus === STATUS_ERROR ) {
			return <BurnError reason={ errorReason } />;
		}

		return false;
	}
}

function mapStateToProps( state ) {
	const { selected, available, progress, burnStatus, errorReason } = state.drive;

	return {
		selectedDrive: getSelectedDrive( available, selected ),
		progress,
		burnStatus,
		errorReason,
	};
}

function mapDispatchToProps( dispatch ) {
	return {
		onStartBurn: device => {
			dispatch( startBurn( device ) );
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)( Burn );
