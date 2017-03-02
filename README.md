# Blog In A Box Installer

A GUI installer tool to install [Blog In A Box](https://inabox.blog/) onto an SD card.

Manages the download of WordPress, Raspbian, and subsequent configuration, as well as the actual image burning.

## Installation

[Install Yarn](https://yarnpkg.com/en/docs/install) and then:

`yarn install --ignore-platform`

This ensures you install all platform specific modules (Windows and MacOS).

## Development

Run the development server that contains the web app:

`yarn run start`

Then run the development Electron app:

`yarn run dev`

The web app is found in the `src` directory, and the Electron app in `app`.

Electron will hot-reload any changes you make to the web app, but changes will to the Electron app will require a restart of Electron.

## Running a packaged version

Run:

`yarn run pack`

To produce local packaged versions of the app.

### Dependencies

During development dependencies are taken from the main `package.json`. For the production build only packages in the `app` directory will be used. It's therefore
important that you add packages to both.

## Packaging

A packaged version of the app can be built with:

`yarn run dist`

## Releasing

To make a release to Github:

- Commit all changes to Github and ensure that `package.json` and `app/package.json` have been versioned.
- Ensure `GH_TOKEN` is set with a Github application specific token (needs the `repo` scope permission)
- Ensure `WIN_CSC_LINK` points at a valid `.p12` certificate (needs to be a full path)
- Ensure `WIN_CSC_KEY_PASSWORD` contains the password for the certificate file
- `yarn run release`
- Go to [Releases](https://github.com/Automattic/biab-installer/releases) and edit the draft release
- Publish release

### DMG Background

The DMG background is combined from build/dmg/background@1x.png and build/dmg/background@2x.png into build/dmg/background.png. To combine:

`yarn run dmg`

## Contributing

We welcome contributions in any form, and you can help reporting, testing, and detailing bugs.

## License

The Blog In A Box installer is licensed under [GNU General Public License](./LICENSE).
