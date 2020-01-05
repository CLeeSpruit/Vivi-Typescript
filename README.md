[![Build Status](https://travis-ci.com/CassandraSpruit/Vivi.svg?branch=master)](https://travis-ci.com/CassandraSpruit/Vivi-Typescript)
[![codecov](https://codecov.io/gh/CassandraSpruit/Vivi/branch/master/graph/badge.svg)](https://codecov.io/gh/CassandraSpruit/Vivi-Typescript)
[![npm](https://img.shields.io/npm/v/@cspruit/vivi)](https://www.npmjs.com/package/@cspruit/vivi-ts)
[![license](https://img.shields.io/github/license/CassandraSpruit/Vivi)](https://github.com/CassandraSpruit/Vivi-Typescript/blob/master/LICENSE)
[![Greenkeeper badge](https://badges.greenkeeper.io/CassandraSpruit/Vivi.svg)](https://greenkeeper.io/)

# Vivi

A lightweight component-focused Typescript framework.

This version of Vivi will not be maintained extensively. For the latest updates, use the [Javascript](https://github.com/CassandraSpruit/Vivi) version.
---

## Announcements
### Versioning
Vivi is moving over to true automated semantic releases, so future update announcements and milestones will be groups of major feature updates and fixes.

### Node Tree Milestone Update (Previously v3):
Node tree milestone is complete and has been released! Some of the new changes:
- Dynamic loading for child components from the template, like adding a list of components based off an array
- Easier loading for child components from the component class
- Lots of component and template-related bugfixes! Yay!
- Smaller package size!

---
## Installation and Gettings Started
- Install by running ```npm install --save-dev @cspruit/vivi-ts``` in the same directory as the package.json file lives.
- Webpack is required to use Vivi's automatic template and style loading. For more detail, checkout the [Getting Started](https://github.com/CassandraSpruit/Vivi-Typescript/wiki/Getting-Started) page.

## Contributing
_All contributions, suggestions, and issues are welcome!_

Keep in mind, this version will only be lightly maintained and most of the feature updates will be in the Vivi repo.

Check out the [Issues](https://github.com/CassandraSpruit/Vivi-Typescript/issues) page. In general anything listed is up for grabs, though bugs tend to be more detailed than enhancements and might be better to pick up if starting out.

### How to Contribute
1. Fork this repository
2. Create a branch: ```git checkout -b <branch_name>```
3. Make your changes and commit using : ```npm run commit```
    - Please remeber to write tests, if applicable.
    - You can run tests by running ```npm run test```. Or if you have jest installed, you can run it for specific files.
    - Note: There seems to be a bug with running code coverage along with debugging in VS Code. You can turn off coverage in the jest.config.js file by commenting "collectCoverage: true" out or setting it to false.
4. Push to the original branch: ```git push origin https://github.com/CassandraSpruit/Vivi-Typescript.git```
5. Create a [Pull Request](https://github.com/CassandraSpruit/Vivi-Typescript/pulls)

## License
This project uses [GPL 3.0](https://github.com/CassandraSpruit/Vivi-Typescript/blob/master/LICENSE).
