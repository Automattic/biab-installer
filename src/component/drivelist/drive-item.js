/**
 * External dependencies
 */

import React from 'react';
import prettysize from 'prettysize';
import classnames from 'classnames';

/**
 * Internal dependencies
 */

import { getDriveName } from 'state/drive/selector';

const DriveItem = ( props ) => {
	const { drive, onSelect, selected, isProtected } = props;
	const classes = classnames( {
		'drive-item': true,
		'is-selected': selected,
		'is-protected': isProtected,
	} );
	const clicker = () => {
		if ( ! isProtected ) {
			onSelect( drive.device );
		}
	};

	return (
		<div className={ classes } onClick={ clicker }>
			{ getDriveName( drive ) + ' - ' + prettysize( drive.size ) }
		</div>
	);
};

export default DriveItem;
