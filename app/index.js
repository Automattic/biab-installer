if ( process.env.ELECTRON_RUN_AS_NODE || process.env.ATOM_SHELL_INTERNAL_RUN_AS_NODE ) {
	require( './cli' );
} else {
	require( './gui' );
}
