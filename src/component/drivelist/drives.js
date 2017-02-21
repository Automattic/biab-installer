/**
 * External dependencies
 */

import React from 'react';

/**
 * Internal dependencies
 */

import DriveItem from './drive-item';

const Drives = ( props ) => {
	const { available, onSelect, selected } = props;

	return (
		<div className="drives">
			{ available.map( drive => <DriveItem drive={ drive } key={ drive.device } onSelect={ onSelect } selected={ drive.device === selected } /> ) }
		</div>
	);
};

export default Drives;
