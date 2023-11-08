export const environment = {
  production: true,
  authenticated: false,
  test: false,
  dev: false,

  ENTE_ID: 'SIF07',

  API_URL_BASE: 'https://gw.comune.messina.it',
  API_ROOMS_URL_BASE: 'https://gw.comune.messina.it/newbolite/v2',
  API_USER_TASKS_URL_BASE: 'https://gw.comune.messina.it/usertask',
  API_SEGNALAME_URL_BASE: 'https://gw.comune.messina.it/segnalame',
  API_SEGNALAME_URL_DRUPAL: 'https://agora.comune.messina.it',
  API_SEGNALAME_AUTH_DRUPAL: '5cbdc2c29841ad0c2850501bddef1c948a6bb2c25e017f6ea5bf90dd2ac99fec',
  API_PRENOTAUFFICIO_URL_BASE: 'https://gw.comune.messina.it/prenota-ufficio',

  DRUPAL_BASEURL: 'https://agora.comune.messina.it',
  AUTH_URL: 'https://spid.comune.messina.it',
  AUTH_CLIENT_ID: 'mKm9yjfQJI2YDAPAy9Sif98SGTga',
  AUTH_SECRET_KEY: 'A959A53HDI_ckKqEYfKLN3b4Fvwa', // TODO: rimuovere, tanto non serve
  AUTH_SCOPE: 'openid',
  AUTH_RESPONSE_TYPE: 'code',

  REPORT_CSV_FILENAME: 'report.csv',
  TRIBUTI_CSV_FILENAME: 'tributi.csv',
}
