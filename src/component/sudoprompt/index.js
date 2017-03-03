/**
 * External dependencies
 */

import React from 'react';

const Sudoprompt = () => {
	return (
		<div className="home">
			<br /><br />
			<h1>Additional Dependencies Required</h1>

			<p>Sorry to be a nuisance, but we need <code>kdesudo</code> to continue.</p>
			<p>This is required to give the app elevated privileges when burning to your device.</p>

			<p><code>sudo apt-get install kdesudo</code></p>
			<p>Please restart the app when you have done this.</p>
		</div>
	);
};

export default Sudoprompt;
