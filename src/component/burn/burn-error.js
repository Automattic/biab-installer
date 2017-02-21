/**
 * External dependencies
 */

import React from 'react';

const BurnError = ( props ) => {
	const { reason } = props;

	return (
		<div className="home">
			<header>
				<h1>Burning Failed</h1>
			</header>

			<main>
				<div className="burn-error">
					{ reason }
				</div>
			</main>
		</div>
	);
};

export default BurnError;
