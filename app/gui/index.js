const electron = require( 'electron' );
const log = require( 'electron-log' );
const path = require( 'path' );
const url = require( 'url' );
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const shell = electron.shell;
const os = require( 'os' );

const isDevelopment = () => process.env.NODE_ENV === 'development';

let mainWindow = null;

if ( isDevelopment() ) {
	const p = path.join( __dirname, '..', 'app', 'node_modules' );

	require( 'electron-debug' )();
	require( 'module' ).globalPaths.push( p );
}

const installExtensions = () => {
	if ( isDevelopment() ) {
		const installer = require( 'electron-devtools-installer' );

		const extensions = [
			'REACT_DEVELOPER_TOOLS',
			'REDUX_DEVTOOLS'
		];

		extensions.map( name => installer.default( installer[ name ] ) );
	}
};

const getPageUrl = () => {
	if ( isDevelopment() ) {
		return url.format( {
			hostname: 'localhost',
			port: 3312,
			protocol: 'http:',
			slashes: true
		} );
	}

	return url.format( {
		pathname: __dirname + '/../index.html',
		protocol: 'file:',
		slashes: true
	} );
};

const getWindowOptions = () => {
	const base = {
		width: 800,
		height: 500,
		resizable: false,
		maximizable: false,
	};

	if ( os.platform() === 'darwin' ) {
		return Object.assign( {}, base, {
			frame: false,
			titleBarStyle: 'hidden',
		} );
	}

	return Object.assign( {}, base, {
		useContentSize: true,
	} );
}

function createWindow() {
	const pageUrl = getPageUrl();

	log.info( 'Opening ' + pageUrl );

	mainWindow = new BrowserWindow( getWindowOptions() );
	mainWindow.loadURL( pageUrl );

	if ( isDevelopment() ) {
		mainWindow.webContents.openDevTools();
	}

	// Emitted when the window is closed.
	mainWindow.on( 'closed', function() {
		mainWindow = null;
	} );

	mainWindow.webContents.on('new-window', ( event, url ) => {
		event.preventDefault();
		shell.openExternal( url );
	} );
}

const shouldQuit = app.makeSingleInstance( () => {
	if ( mainWindow ) {
		if ( mainWindow.isMinimized() ) {
			mainWindow.restore();
	 	}

		mainWindow.focus();
	}
} );

if ( shouldQuit ) {
  app.quit();
}

app.on( 'ready', () => {
	installExtensions();
	createWindow();
} );

app.on( 'window-all-closed', function() {
	if ( process.platform !== 'darwin' ) {
		app.quit();
	}
} );

app.on( 'activate', function() {
	if ( mainWindow === null ) {
		createWindow();
	}
} );
