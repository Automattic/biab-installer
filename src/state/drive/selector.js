/**
 * External dependencies
 */

import os from 'os';

export const getSelectedDrive = ( available, selected ) => available.find( drive => drive.device === selected );
export function getDriveName( drive ) {
	if ( os.platform() === 'win32' ) {
		return drive.mountpoints.length > 0 ? drive.mountpoints[ 0 ].path : drive.description;
	}

	return drive.device;
}

export const getMountPoint = drive => drive.mountpoints.length > 0 ? drive.mountpoints[ 0 ].path : false;
