/**
 * Internal dependencies
 */

import {
	DRIVE_SET_AVAILABLE,
	DRIVE_SELECT,
	DRIVE_SELECTOR_SHOW,
	DRIVE_SELECTOR_HIDE,
	DRIVE_BURN_PROGRESS,
	DRIVE_BURN_ERROR,
	DRIVE_BURN_IMAGE_COMPLETE,
	DRIVE_BURN_FINISHED,

	STATUS_BURNING_IMAGE,
	STATUS_BURNING_EXTRA,
	STATUS_COMPLETE,
	STATUS_ERROR,
} from './type';

const isSystemDrive = item => ! item.system;
const isMountedDrive = item => item.mountpoints.length > 0;

function setProgress( action ) {
	return {
		percentage: action && action.percentage ? action.percentage : 0,
		eta: action && action.eta ? action.eta : 0,
		speed: action && action.speed ? action.speed : 0,
	};
}

function setCompleteProgress() {
	return {
		percentage: 100,
		eta: 0,
		speed: 0,
	};
}

function setAvailable( newDrives, existingDrives ) {
	const drives = newDrives.filter( item => isSystemDrive( item ) ).filter( item => isMountedDrive( item ) );
	let newer = 0;

	drives.forEach( item => {
		if ( ! existingDrives.find( existItem => existItem.device === item.device ) ) {
			newer++;
		}
	} );

	if ( newer ) {
		return drives;
	}

	return existingDrives;
}

export default function drive( state = {}, action ) {
	switch ( action.type ) {
		case DRIVE_SELECT:
			return { ... state, selected: action.drive, showing: false };

		case DRIVE_SET_AVAILABLE:
			const avail = setAvailable( action.drives, state.available );

			return { ... state, available: avail, selected: avail.length === 1 && state.available.length === 0 ? avail[ 0 ].device : state.selected };

		case DRIVE_SELECTOR_SHOW:
			return { ... state, showing: true };

		case DRIVE_SELECTOR_HIDE:
			return { ... state, showing: false };

		case DRIVE_BURN_PROGRESS:
			return { ... state, progress: setProgress( action ), burnStatus: STATUS_BURNING_IMAGE };

		case DRIVE_BURN_IMAGE_COMPLETE:
			return { ... state, progress: setCompleteProgress(), burnStatus: STATUS_BURNING_EXTRA };

		case DRIVE_BURN_FINISHED:
			return { ... state, progress: setProgress(), burnStatus: STATUS_COMPLETE };

		case DRIVE_BURN_ERROR:
			console.error( action.error.message );
			return { ... state, burnStatus: STATUS_ERROR, progress: setProgress(), errorReason: action.error.message };
	}

	return state;
}
