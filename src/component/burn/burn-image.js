/**
 * External dependencies
 */

import React from 'react';
import prettysize from 'prettysize';
import humanize from 'humanize-duration';

/**
 * Internal dependencies
 */

import { getDriveName } from 'state/drive/selector';

const Speed = props => {
	const { speed, eta } = props;

	return (
		<div>
			<p>Speed: { prettysize( speed ) + '/s' }</p>
			<p>Time remaining: { humanize( eta * 1000 ) }</p>
		</div>
	);
};

const BurnImage = ( props ) => {
	const { progress, selectedDrive, finalising } = props;
	const { percentage, speed, eta } = progress;

	return (
		<div className="home">
			<header>
				<h1>Burning to { getDriveName( selectedDrive ) }</h1>
			</header>

			<main>
				<div className="burn-status">
					<div className="progress">
						<div className="progress-bar" style={ { width: percentage + '%' } }></div>
					</div>

					{ finalising ? <p>Finalising image</p> : <Speed speed={ speed } eta={ eta } /> }
				</div>
			</main>
		</div>
	);
};

export default BurnImage;
