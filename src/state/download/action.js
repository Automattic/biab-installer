/**
 * Internal dependencies
 */

import {
	DOWNLOAD_START_CHECK,
	DOWNLOAD_CHECK,
	DOWNLOAD_START,

	DOWNLOAD_ERROR,
	DOWNLOAD_COMPLETE,
	DOWNLOAD_PROGRESS,
} from './type';

export const checkForDownload = name => ( { type: DOWNLOAD_START_CHECK, name } );
export const downloadCheck = resource => ( { type: DOWNLOAD_CHECK, resource } );
export const downloadStart = ( name, url, version ) => ( { type: DOWNLOAD_START, name, url, version } );
export const downloadError = name => ( { type: DOWNLOAD_ERROR, name } );
export const downloadComplete = ( name, version ) => ( { type: DOWNLOAD_COMPLETE, name, version } );
export const downloadProgress = ( name, progress ) => ( { type: DOWNLOAD_PROGRESS, name, progress } );
