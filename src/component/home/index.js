/* global document, localStorage */
/**
 * External dependencies
 */

import React from 'react';
import { connect } from 'react-redux';

import GatherBasic from 'component/gather-basic';
import GatherAdvanced from 'component/gather-advanced';
import Introduction from 'component/introduction';
import SelectDrive from 'component/select-drive';
import Burn from 'component/burn';
import Download from 'component/download';
import Complete from 'component/complete';
import ShowAgain from 'component/show-again';
import SudoPrompt from 'component/sudoprompt';

import {
	STAGE_INTRO,
	STAGE_GATHER_BASIC,
	STAGE_GATHER_ADVANCED,
	STAGE_SELECT_DRIVE,
	STAGE_BURN,
	STAGE_DOWNLOAD,
	STAGE_COMPLETE,
	STAGE_SHOW_DETAILS,
	STAGE_SHOW_SUDOPROMPT,
} from 'state/config/type';

class Home extends React.Component {
	constructor( props ) {
		super( props );

		document.addEventListener( 'keydown', e => {
			if ( e.keyCode === 73 && e.ctrlKey && e.shiftKey ) {
				require( 'electron' ).remote.getCurrentWindow().toggleDevTools();
				localStorage.debug = 'biab:*';
			}
		} );
	}

	render() {
		const { stage } = this.props;

		if ( stage === STAGE_INTRO ) {
			return <Introduction />;
		} else if ( stage === STAGE_DOWNLOAD ) {
			return <Download />;
		} else if ( stage === STAGE_GATHER_BASIC ) {
			return <GatherBasic />;
		} else if ( stage === STAGE_GATHER_ADVANCED ) {
			return <GatherAdvanced />;
		} else if ( stage === STAGE_SELECT_DRIVE ) {
			return <SelectDrive />;
		} else if ( stage === STAGE_BURN ) {
			return <Burn />;
		} else if ( stage === STAGE_COMPLETE ) {
			return <Complete />;
		} else if ( stage === STAGE_SHOW_DETAILS ) {
			return <ShowAgain />;
		} else if ( stage === STAGE_SHOW_SUDOPROMPT ) {
			return <SudoPrompt />;
		}
	}
}

function mapStateToProps( state ) {
	const { stage } = state.config;

	return {
		stage,
	};
}

export default connect(
	mapStateToProps,
	null
)( Home );
