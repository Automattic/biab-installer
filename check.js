const thisPackage = require( './package.json' );
const releasePackage = require( './app/package.json' );

if ( thisPackage.version !== releasePackage.version ) {
	console.error( 'Package versions are different! Update the version in package.json and app/package.json.' );
	process.exit( 1 );
}

process.exit( 0 );
