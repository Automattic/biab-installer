/**
 * External dependencies
 */

import os from 'os';
import path from 'path';

export const getSelectedDrive = ( available, selected ) => available.find( drive => drive.device === selected );
export function getDriveName( drive ) {
	if ( os.platform() === 'win32' ) {
		return drive.mountpoints.length > 0 ? drive.mountpoints[ 0 ].path : drive.description;
	} else if ( os.platform() === 'darwin' ) {
		return path.basename( drive.mountpoints[ 0 ].path );
	}

	return drive.device;
}
export function getDeviceName( drive ) {
	return drive.device;
}

export const getMountPoint = drive => drive.mountpoints.length > 0 ? drive.mountpoints[ drive.mountpoints.length - 1 ].path : false;
