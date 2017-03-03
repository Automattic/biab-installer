/**
 * External dependencies
 */

import fs from 'fs';
import os from 'os';

/**
 * Internal dependencies
 */

import { STAGE_INTRO, STAGE_SHOW_SUDOPROMPT } from './type';
import { getDefaultSettings } from './selector';

function hasSudoPrompt() {
	const paths = [ '/usr/bin/kdesudo' ];

	return paths.some( item => fs.existsSync( item ) );
}

function getStartStage() {
	if ( os.platform() === 'linux' && ! hasSudoPrompt() ) {
		return STAGE_SHOW_SUDOPROMPT;
	}

	return STAGE_INTRO;
}

export function getInitialConfig() {
	return {
		stage: getStartStage(),
		validity: [],
		settings: getDefaultSettings(),
	};
}
