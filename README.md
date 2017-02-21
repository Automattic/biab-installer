# Blog In A Box Installer

A GUI installer tool to install [Blog In A Box](https://github.com/tinkertinker/biab-plugin) onto an SD card.

Manages the download of WordPress, Raspbian, and subsequent configuration, as well as the actual image burning.

## Installation

[Install Yarn](https://yarnpkg.com/en/docs/install) and then:

`yarn run install`

This ensures you install all platform specific modules (Windows and MacOS).

## Development

Run the development server that contains the web app:

`yarn run start`

Then run the development Electron app:

`yarn run dev`

The web app is found in the `src` directory, and the Electron app in `app`.

Electron will hot-reload any changes you make to the web app, but changes will to the Electron app will require a restart of Electron.

### Dependencies

During development dependencies are taken from the main `package.json`. For the production build only packages in the `app` directory will be used. It's therefore
important that you add packages to both.

## Packaging

A packaged version of the app can be built with:

`yarn run dist`

### DMG Background

The DMG background is combined from build/dmg/background@1x.png and build/dmg/background@2x.png into build/dmg/background.png. To combine:

`yarn run dmg`
