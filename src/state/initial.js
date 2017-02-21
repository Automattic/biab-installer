/**
 * Internal dependencies
 */

import { getInitialDownload } from 'state/download/initial';
import { getInitialDrive } from 'state/drive/initial';
import { getInitialConfig } from 'state/config/initial';
import { checkForDownload } from 'state/download/action';
import { DOWNLOAD_TYPE_WORDPRESS, DOWNLOAD_TYPE_RASPBIAN } from 'state/download/type';

export function initialActions( store ) {
	store.dispatch( checkForDownload( DOWNLOAD_TYPE_WORDPRESS ) );
	store.dispatch( checkForDownload( DOWNLOAD_TYPE_RASPBIAN ) );
}

export function getInitialState() {
	return {
		download: getInitialDownload(),
		drive: getInitialDrive(),
		config: getInitialConfig(),
	};
}
