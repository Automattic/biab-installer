# biab

Blog In A Box

## Installation

[Install Yarn](https://yarnpkg.com/en/docs/install) and then:

`yarn install`

## Development

Run the development server that contains the web app:

`npm start`

Then run the development Electron app:

`npm run dev`

The web app is found in the `src` directory, and the Electron app in `app`.

Electron will hot-reload any changes you make to the web app, but changes will to the Electron app will require a restart of Electron.

### Dependencies

During development dependencies are taken from the main `package.json`. For the production build only packages in the `app` directory will be used. It's therefore
important that you add packages to both.

Something about 'web' and 'app'
## Production



Native

in app `yarn install --ignore-platform`


linux needs kdesudo or pkexec installed
