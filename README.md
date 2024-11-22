# Token Craft App
This project provides a standalone application that allows users to easily generate tokens. The app is built using React and Electron to deliver a smooth desktop experience.

## Features
- Generate Tokens using Azure OAuth with a signed certificate.
- Standalone Desktop Application that runs directly on Windows.
- Portable and Installable Options for distribution.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the react app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

- The page will reload when you make changes.\
- You may also see any lint errors in the console.

### `npm run build`

Builds the react app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
- The production-ready app is stored in the build directory.

### `npm run electron-start`

Runs the electron-react app in the development mode.\
- It combines React and Electron for an integrated development experience.
- The Electron app is launched with the React app in development mode, with live reload enabled.

### `npm run electron-build`

Builds the electron-react app for production to the `dist` folder.\
The build artifacts include:

- Installer: For installing the app on Windows.
- Portable executable file: A standalone executable to run the app directly.

## Deployment
Follow these steps to deploy the app:
- Run `npm install` to install all necessary dependencies.
- Run `npm run electron-build` to build the production artifacts.
- Distribute the Installer, or portable executable as required

## Additional Information
- Electron provides a native desktop experience, so the app runs independently of a browser.
- The app is optimized for Windows, but can be adapted to other platforms with minimal changes.

