/* global localStorage */

const app = require( 'electron' ).remote.app;
import path from 'path';

/**
 * Internal dependencies
 */

import {
	DOWNLOAD_STATUS_CHECKING,
	DOWNLOAD_STATUS_COMPLETE,
	DOWNLOAD_TYPE_WORDPRESS,
	DOWNLOAD_TYPE_RASPBIAN
} from './type';

export const areDownloadsAvailable = resources => resources.every( item => item.status === DOWNLOAD_STATUS_COMPLETE );
export const getNewResource = () => {
	return {
		name: false,
		title: false,
		installed: false,
		available: false,
		downloadUrl: false,
		localFile: false,
		status: DOWNLOAD_STATUS_CHECKING,
		progress: 0,
	};
};
export const getResource = ( name, available ) => available.find( item => item.name === name );

export function getWordPressResource() {
	return Object.assign( {}, getNewResource(), {
		title: 'WordPress',
		name: DOWNLOAD_TYPE_WORDPRESS,
		installed: localStorage.getItem( 'installed-' + DOWNLOAD_TYPE_WORDPRESS ) || false,
		localFile: path.join( app.getPath( 'userData' ), 'wordpress.zip' ),
	} );
}

export function getRaspbianResource() {
	return Object.assign( {}, getNewResource(), {
		title: 'Blog In A Box',
		name: DOWNLOAD_TYPE_RASPBIAN,
		installed: localStorage.getItem( 'installed-' + DOWNLOAD_TYPE_RASPBIAN ) || false,
		localFile: path.join( app.getPath( 'userData' ), 'blog-in-a-box.zip' ),
	} );
}
