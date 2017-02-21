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
} from './type';

import { writeImage, updateImage } from './drive-tools';
import { getSelectedDrive } from './selector';
import { getResource } from 'state/download/selector';
import { DOWNLOAD_TYPE_WORDPRESS, DOWNLOAD_TYPE_RASPBIAN } from 'state/download/type';

const UPDATE_GAP = 1000;

export const selectDrive = drive => ( { type: DRIVE_SELECT, drive } );
export const hideDriveSelector = () => ( { type: DRIVE_SELECTOR_HIDE } );
export const burnProgress = ( percentage, eta, speed ) => ( { type: DRIVE_BURN_PROGRESS, percentage, eta, speed } );
export const setAvailableDrives = drives => ( { type: DRIVE_SET_AVAILABLE, drives } );
export const burnError = error => ( { type: DRIVE_BURN_ERROR, error } );
export const showDriveSelector = () => ( { type: DRIVE_SELECTOR_SHOW } );

export const startBurn = device => {
	return ( dispatch, getState ) => {
		const biabResource = getResource( DOWNLOAD_TYPE_RASPBIAN, getState().download.resources );

		dispatch( { type: DRIVE_BURN_PROGRESS } );

		writeImage( device, biabResource.localFile, dispatch );
	};
};

export const burnImageComplete = () => {
	return ( dispatch, getState ) => {
		const { config, drive } = getState();
		const wpResource = getResource( DOWNLOAD_TYPE_WORDPRESS, getState().download.resources );

		dispatch( { type: DRIVE_BURN_IMAGE_COMPLETE } );

		// We need a pause before copying the final stuff
		setTimeout( () => {
			updateImage( getSelectedDrive( drive.available, drive.selected ), wpResource, config, dispatch );
		}, UPDATE_GAP );
	};
};

export const burnFinished = () => ( { type: DRIVE_BURN_FINISHED } );
