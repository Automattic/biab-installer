const electron = require( 'electron' );
const Menu = electron.Menu;
const app = electron.app;

function show() {
	if ( process.platform !== 'darwin' ) {
		return;
	}

	const template = [
		{
			label: 'Edit',
			submenu: [
				{
		          role: 'undo'
		        },
		        {
		          role: 'redo'
		        },
		        {
		          type: 'separator'
		        },
		        {
		          role: 'cut'
		        },
		        {
		          role: 'copy'
		        },
		        {
		          role: 'paste'
		        },
		        {
		          role: 'pasteandmatchstyle'
		        },
		        {
		          role: 'delete'
		        },
		        {
		          role: 'selectall'
		        }
			]
		},
		{
			label: 'Window',
			submenu: [
				{
		          role: 'minimize'
		        },
		        {
		          role: 'close'
		        }
			]
		},
	];

	template.unshift( {
		label: app.getName(),
		submenu: [
			{
				role: 'hide',
				label: 'Hide Blog In A Box',
			},
			{
				role: 'hideothers'
			},
			{
				role: 'unhide'
			},
			{
				type: 'separator'
			},
			{
				role: 'quit',
				label: 'Quit Blog In A Box'
			}
		]
	} );

	Menu.setApplicationMenu( Menu.buildFromTemplate( template ) );
}

module.exports = {
	show
};
