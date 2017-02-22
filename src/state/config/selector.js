/**
 * External dependencies
 */

import password from 'generate-password';

const PASSWORD_CONFIG = { length: 16, numbers: true };

export const hasUpdate = version => version.installed !== version.available;

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
