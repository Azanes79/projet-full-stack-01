// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCyJKLuzlQg2vgEmFWlDcKwWjtkSnskp1I",
    authDomain: "projetfullstack01.firebaseapp.com",
    projectId: "projetfullstack01",
    storageBucket: "projetfullstack01.appspot.com",
    messagingSenderId: "468007578434",
    appId: "1:468007578434:web:f79fc79554717ca15036db"
  },
  api: 'http://localhost:3001',
  io: 'http://localhost:3000'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
