/**
 * Internal dependencies
 */

import {
	CONFIG_GOTO_STAGE,
	CONFIG_CHANGE_SETTING,
	CONFIG_CLEAR_ALL,
	CONFIG_PICK_SSH,
} from './type';

export const gotoStage = stage => ( { type: CONFIG_GOTO_STAGE, stage } );
export const changeSetting = ( name, value, isValid ) => ( { type: CONFIG_CHANGE_SETTING, name, value, isValid } );
export const clearAllData = () => ( { type: CONFIG_CLEAR_ALL } );
export const pickSshKey = () => ( { type: CONFIG_PICK_SSH } );
