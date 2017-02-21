/**
 * External dependencies
 */

import React from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { gotoStage } from 'state/config/action';
import { STAGE_GATHER_BASIC, STAGE_INTRO } from 'state/config/type';
import { DOWNLOAD_STATUS_CHECKING, DOWNLOAD_STATUS_ERROR, DOWNLOAD_STATUS_DOWNLOADING } from 'state/download/type';
import { areDownloadsAvailable } from 'state/download/selector';

const DownloadItem = props => {
	const { installed, available, title, status, progress } = props;
	const statusMessage = [];

	statusMessage.push( installed ? 'Version ' + installed : 'No version installed' );

	if ( status === DOWNLOAD_STATUS_CHECKING ) {
		statusMessage.push( 'checking for updates...' );
	} else if ( status === DOWNLOAD_STATUS_ERROR ) {
		statusMessage.push( 'failed to get new version' );
	} else if ( status === DOWNLOAD_STATUS_DOWNLOADING ) {
		statusMessage.push( 'downloading v' + available + ' - ' + progress + '%' );
	}

	return (
		<div>
			<strong>{ title }</strong> - { statusMessage.join( ', ' ) }
		</div>
	);
};

const Download = props => {
	const { onNext, onBack, resources } = props;

	return (
		<div className="home">
			<header>
				<h1>Blog In A Box - Download</h1>
			</header>

			<main>
				{ resources.map( item => <DownloadItem { ... item } key={ item.name } /> ) }
			</main>

			<footer>
				<button onClick={ onBack }>&laquo; Go Back</button>
				<button onClick={ onNext } disabled={ ! areDownloadsAvailable( resources ) }>Configure &raquo;</button>
			</footer>
		</div>
	);
};

function mapDispatchToProps( dispatch ) {
	return {
		onBack: () => {
			dispatch( gotoStage( STAGE_INTRO ) );
		},
		onNext: () => {
			dispatch( gotoStage( STAGE_GATHER_BASIC ) );
		},
	};
}

function mapStateToProps( state ) {
	const { resources } = state.download;

	return {
		resources,
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( Download );
