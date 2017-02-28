/**
 * External dependencies
 */

import password from 'generate-password';
const fs = require( 'fs' );

const PASSWORD_CONFIG = { length: 16, numbers: true };

export const hasUpdate = version => version.installed !== version.available;

const escapeQuote = str => str.replace( /"/g, '\\"' );

export function getDefaultSettings() {
	return {
		hostname: 'bloginabox',

		samba: 'WORKGROUP',

		wpUsername: 'biab',
		wpPassword: password.generate( PASSWORD_CONFIG ),
		wpEmail: 'biab@bloginabox.local',
		wpTitle: 'Blog In A Box',
		wpTagline: 'Blog In A Box',

		mysqlRootPassword: password.generate( PASSWORD_CONFIG ),
		mysqlWpUser: 'biab',
		mysqlWpPassword: password.generate( PASSWORD_CONFIG ),
		mysqlWpDatabase: 'biab',

		piPassword: password.generate( PASSWORD_CONFIG ),

		sshKey: '',

		wifiNetwork: '',
		wifiPassword: '',

		timezone: 'Europe/London',
		locale: 'en_US.UTF-8',

		nodeVersion: '6.9.4',
	};
}

function getSshKey( location ) {
	if ( location ) {
		try {
			return fs.readFileSync( location ).toString().trim();
		} catch ( e ) {
			return '';
		}
	}

	return '';
}

export function getSettingsAsText( config ) {
	const lines = [
		`SAMBA_WORKGROUP="${ config.samba }"`,
		'',
		`HOSTNAME="${ config.hostname }"`,
		`HOSTNAME_URL="${ config.hostname }.local"`,
		'',
		`NODE_VERSION=${ config.nodeVersion }`,
		'',
		`WP_USERNAME="${ config.wpUsername }"`,
		`WP_PASSWORD="${ escapeQuote( config.wpPassword ) }"`,
		`WP_EMAIL="${ escapeQuote( config.wpEmail ) }"`,
		`WP_TAGLINE="${ escapeQuote( config.wpTagline ) }"`,
		`WP_BLOG_TITLE="${ escapeQuote( config.wpTitle ) }"`,
		'',
		`MYSQL_ROOT_PASSWORD="${ escapeQuote( config.mysqlRootPassword ) }"`,
		`MYSQL_WP_USER="${ config.mysqlWpUser }"`,
		`MYSQL_WP_PASSWORD="${ escapeQuote( config.mysqlWpPassword ) }"`,
		`MYSQL_WP_DATABASE="${ config.mysqlWpDatabase }"`,
		'',
		`PI_USER_PASSWORD="${ escapeQuote( config.piPassword ) }"`,
		'',
		`SSH_KEY="${ escapeQuote( getSshKey( config.sshKey ) ) }"`,
		'',
		`WIFI_NETWORK="${ config.wifiNetwork }"`,
		`WIFI_PASSWORD="${ config.wifiPassword }"`,
		'',
		`TIMEZONE=${ config.timezone }`,
		`LOCALE=${ config.locale }`,
	];

	return lines.join( '\n' );
}
