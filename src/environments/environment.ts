// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDtccgm42dK94aRhcZwbgqxeoOQ4EWcFKM',
    authDomain: 'resamsel-cube-timer-dev.firebaseapp.com',
    databaseURL: 'https://resamsel-cube-timer-dev.firebaseio.com',
    projectId: 'resamsel-cube-timer-dev',
    storageBucket: 'resamsel-cube-timer-dev.appspot.com',
    messagingSenderId: '1071791134538'
  }
};
