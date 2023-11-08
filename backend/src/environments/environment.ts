// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authenticated: false,
  test: false,
  dev: true,

  ENTE_ID: 'SIF07',

  API_URL_BASE: 'https://gw-dev.impleme.giottolabs.com',
  API_ROOMS_URL_BASE: 'https://gw-dev.impleme.giottolabs.com/newbolite/v2',
  API_USER_TASKS_URL_BASE: 'https://gw-dev.impleme.giottolabs.com/usertask',
  API_SEGNALAME_URL_BASE: 'https://gw-dev.impleme.giottolabs.com/segnalame',
  API_SEGNALAME_URL_DRUPAL: 'https://agora-dev.impleme.giottolabs.com',
  DRUPAL_BASEURL: 'https://agora-dev.impleme.giottolabs.com',
  API_SEGNALAME_AUTH_DRUPAL: '5cbdc2c29841ad0c2850501bddef1c948a6bb2c25e017f6ea5bf90dd2ac99fec',
  API_PRENOTAUFFICIO_URL_BASE: 'https://gw-dev.impleme.giottolabs.com/prenota-ufficio',

  AUTH_URL: 'https://spid-dev.impleme.giottolabs.com',
  /*AUTH_CLIENT_ID: 'NRpfs8afaYLYEPYZcLnSDqYujfca',
  AUTH_SECRET_KEY: '3wkhfUvu_Jt3Tcybdx_x2DMV7Tga',*/
  AUTH_CLIENT_ID: 'nI5Mhqfc4SHSIbvp1CL1TvfENYQa',
  AUTH_SECRET_KEY: '2OiN5zOkoXfucFUg2bOlvzW48K4a',
  AUTH_SCOPE: 'openid',
  AUTH_RESPONSE_TYPE: 'code',

  REPORT_CSV_FILENAME: 'report.csv',
  TRIBUTI_CSV_FILENAME: 'tributi.csv',
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
