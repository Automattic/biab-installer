/**
 * External dependencies
 */

import React from 'react';
import prettysize from 'prettysize';

/**
 * Internal dependencies
 */

import { getDriveName } from 'state/drive/selector';

const DriveItem = ( props ) => {
	const { drive, onSelect, selected } = props;
	const clicker = () => {
		onSelect( drive.device );
	};

	return (
		<div className={ 'drive-item' + ( selected ? ' is-selected' : '' ) } onClick={ clicker }>
			{ getDriveName( drive ) + ' - ' + prettysize( drive.size ) }
		</div>
	);
};

export default DriveItem;
