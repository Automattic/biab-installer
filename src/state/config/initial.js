/**
 * Internal dependencies
 */

import { STAGE_INTRO } from './type';
import { getDefaultSettings } from './selector';

export function getInitialConfig() {
	return {
		stage: STAGE_INTRO,
		validity: [],
		settings: getDefaultSettings(),
	};
}
