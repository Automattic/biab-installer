/**
 * Internal dependencies
 */

import {
	CONFIG_GOTO_STAGE,
	CONFIG_CHANGE_SETTING,

	STAGE_COMPLETE,
} from './type';
import { DRIVE_BURN_FINISHED } from 'state/drive/type';
import { getDefaultSettings } from './selector';

function changeSetting( current, name, value ) {
	const newValue = {};

	if ( name === 'hostname' || name === 'samba' ) {
		value = value.replace( / /g, '' );
	}

	if ( value.length === 0 ) {
		const def = getDefaultSettings();

		value = def[ name ];
	}

	newValue[ name ] = value;
	return Object.assign( {}, current, newValue );
}

function setValidity( name, isValid, existing ) {
	const without = existing.filter( item => item !== name );

	if ( ! isValid ) {
		return without.concat( [ name ] );
	}

	return without;
}

export default function config( state = {}, action ) {
	switch ( action.type ) {
		case CONFIG_CHANGE_SETTING:
			return { ... state, settings: changeSetting( state.settings, action.name, action.value ), validity: setValidity( action.name, action.isValid, state.validity ) };

		case CONFIG_GOTO_STAGE:
			return { ... state, stage: action.stage };

		case DRIVE_BURN_FINISHED:
			return { ... state, stage: STAGE_COMPLETE };
	}

	return state;
}
