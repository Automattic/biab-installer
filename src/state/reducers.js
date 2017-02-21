import { combineReducers } from 'redux';

import config from 'state/config/reducer';
import drive from 'state/drive/reducer';
import download from 'state/download/reducer';

const reducer = combineReducers( {
	drive,
	config,
	download,
} );

export default reducer;
