const STRUTTURE_INDEX = { title: 'Strutture', url: '/struttura/index' }
const TRIBUTI_INDEX = { title: 'Tributi', url: '/tributi/index' }
const PRENOTAZIONE_SALA_INDEX = { title: 'Prenotazioni sale', url: '/prenotazione-sala/index' }
const PASSI_CARRABILI_INDEX = { title: 'Passi carrabili', url: '/passi-carrabili/casefiles/index' }

function generateFromUrl(url: string): any[] {
  if (url.indexOf('/struttura/update/') > -1) {
    return [STRUTTURE_INDEX, { title: 'Modifica struttura', url }]
  }
  if (url.indexOf('/struttura/preview/') > -1) {
    return [STRUTTURE_INDEX, { title: 'Preview struttura', url }]
  }
  if (url.indexOf('/struttura/index') == 0) {
    return [STRUTTURE_INDEX]
  }
  if (url.indexOf('/struttura/create') == 0) {
    return [STRUTTURE_INDEX, { title: 'Crea struttura', url }]
  }
  if (url.indexOf('/tributi/index') == 0) {
    return [TRIBUTI_INDEX]
  }
  if (url.indexOf('/attributi/index') > -1) {
    return [TRIBUTI_INDEX, { title: 'Attributi', url }]
  }
  if (url.indexOf('/tariffe/index') > -1) {
    return [TRIBUTI_INDEX, { title: 'Tariffe', url }]
  }
  if (url.indexOf('/tariffe/create') > -1) {
    return [TRIBUTI_INDEX, { title: 'Tariffe', url }, { title: 'Crea tariffa', url }]
  }
  if (url.indexOf('/user-tasks/demandable') == 0) {
    return [{ title: 'Prenotazioni da prendere in carico', url }]
  }
  if (url.indexOf('/user-tasks/assignee') == 0) {
    return [{ title: 'Prenotazioni prese in carico', url }]
  }
  if (url.indexOf('/prenotazione-sala/index') == 0) {
    return [PRENOTAZIONE_SALA_INDEX]
  }
  if (url.indexOf('/prenotazione-sala/view') > -1) {
    return [PRENOTAZIONE_SALA_INDEX, { title: 'Dettaglio prenotazione', url }]
  }
  if (url.indexOf('/user-tasks/update/') > -1) {
    return [
      { title: 'Prenotazioni prese in carico', url: '/user-tasks/assignee' },
      { title: 'Modifica prenotazione', url },
    ]
  }
  if (url.indexOf('/segnalame/reportings/view') == 0) {
    return [
      { title: 'SegnalaME', url },
      { title: 'Segnalazioni', url: '/segnalame/reportings' },
      { title: 'Visualizza Segnalazione', url },
    ]
  }
  if (url.indexOf('/segnalame/reportings') == 0) {
    return [
      { title: 'SegnalaME', url },
      { title: 'Segnalazioni', url },
    ]
  }
  if (url.indexOf('/segnalame/settings/institutes/create') == 0) {
    return [
      { title: 'SegnalaME', url },
      { title: 'Enti', url: '/segnalame/settings/institutes' },
      { title: 'Crea Ente', url },
    ]
  }
  if (url.indexOf('/segnalame/settings/institutes/view') == 0) {
    return [
      { title: 'SegnalaME', url },
      { title: 'Enti', url: '/segnalame/settings/institutes' },
      { title: 'Visualizza Ente', url },
    ]
  }
  if (url.indexOf('/segnalame/settings/institutes/edit') == 0) {
    return [
      { title: 'SegnalaME', url },
      { title: 'Enti', url: '/segnalame/settings/institutes' },
      { title: 'Modifica Ente', url },
    ]
  }
  if (url.indexOf('/segnalame/settings/institutes') == 0) {
    return [
      { title: 'SegnalaME', url },
      { title: 'Enti', url },
    ]
  }

  if (url.indexOf('/segnalame/settings/users/create') == 0) {
    return [
      { title: 'SegnalaME', url },
      { title: 'Utenti', url: '/segnalame/settings/users' },
      { title: 'Crea Utente', url },
    ]
  }
  if (url.indexOf('/segnalame/settings/users/view') == 0) {
    return [
      { title: 'SegnalaME', url },
      { title: 'Utenti', url: '/segnalame/settings/users' },
      { title: 'Visualizza Utente', url },
    ]
  }
  if (url.indexOf('/segnalame/settings/users/edit') == 0) {
    return [
      { title: 'SegnalaME', url },
      { title: 'Utenti', url: '/segnalame/settings/users' },
      { title: 'Modifica Utente', url },
    ]
  }
  if (url.indexOf('/segnalame/settings/users') == 0) {
    return [
      { title: 'SegnalaME', url },
      { title: 'Utenti', url },
    ]
  }

  if (url.indexOf('/segnalame/settings/sectors/create') == 0) {
    return [
      { title: 'SegnalaME', url },
      { title: 'Settori', url: '/segnalame/settings/sectors' },
      { title: 'Crea Settore', url },
    ]
  }
  if (url.indexOf('/segnalame/settings/sectors/view') == 0) {
    return [
      { title: 'SegnalaME', url },
      { title: 'Settori', url: '/segnalame/settings/sectors' },
      { title: 'Visualizza Settore', url },
    ]
  }
  if (url.indexOf('/segnalame/settings/sectors/edit') == 0) {
    return [
      { title: 'SegnalaME', url },
      { title: 'Settori', url: '/segnalame/settings/sectors' },
      { title: 'Modifica Settore', url },
    ]
  }
  if (url.indexOf('/segnalame/settings/sectors') == 0) {
    return [
      { title: 'SegnalaME', url },
      { title: 'Settori', url },
    ]
  }

  if (url.indexOf('/prenota-ufficio/reservations/view') == 0) {
    return [
      { title: 'PrenotaUfficio', url },
      { title: 'Prenotazioni', url: '/prenota-ufficio/reservations' },
      { title: 'Visualizza prenotazione', url: url },
    ]
  }
  if (url.indexOf('/prenota-ufficio/reservations') == 0) {
    return [
      { title: 'PrenotaUfficio', url },
      { title: 'Prenotazioni', url: '/prenota-ufficio/reservations' },
    ]
  }

  if (url.indexOf('/prenota-ufficio/offices/municipality') == 0) {
    return [
      { title: 'PrenotaUfficio', url },
      { title: 'Uffici', url: '/prenota-ufficio/offices' },
      { title: 'Lista Uffici', url },
    ]
  }
  if (url.indexOf('/prenota-ufficio/offices') == 0) {
    return [
      { title: 'PrenotaUfficio', url },
      { title: 'Uffici', url },
    ]
  }
  if (url.indexOf('/prenota-ufficio/public-service/create') == 0) {
    return [
      { title: 'PrenotaUfficio', url },
      { title: 'Servizi', url: '/prenota-ufficio/services' },
      { title: 'Servizio', url },
    ]
  }
  if (url.indexOf('/prenota-ufficio/services') == 0) {
    return [
      { title: 'PrenotaUfficio', url },
      { title: 'Servizi', url },
    ]
  }

  /* 
    Passi carrabili
  */
  if (url.indexOf('/passi-carrabili/casefiles/demandable') == 0) {
    return [PASSI_CARRABILI_INDEX, { title: 'Richieste da prendere in carico', url }]
  }
  if (url.indexOf('/passi-carrabili/casefiles/assignee') == 0) {
    return [PASSI_CARRABILI_INDEX, { title: 'Richieste prese in carico', url }]
  }
  if (url.indexOf('/passi-carrabili/casefiles/view') == 0) {
    return [
      PASSI_CARRABILI_INDEX,
      { title: 'Richieste prese in carico', url: '/passi-carrabili/casefiles/assignee' },
      { title: 'Visualizza richiesta', url },
    ]
  }
  if (url.indexOf('/passi-carrabili/types/view') == 0) {
    return [
      PASSI_CARRABILI_INDEX,
      { title: 'Lista tipologie pratiche', url: '/passi-carrabili/types/index' },
      { title: 'Tipologia pratica', url },
    ]
  }
  if (url.indexOf('/passi-carrabili/types/edit') == 0) {
    return [
      PASSI_CARRABILI_INDEX,
      { title: 'Lista tipologie pratiche', url: '/passi-carrabili/types/index' },
      { title: 'Tipologia pratica', url },
    ]
  }
  if (url.indexOf('/passi-carrabili/types/create') == 0) {
    return [
      PASSI_CARRABILI_INDEX,
      { title: 'Lista tipologie pratiche', url: '/passi-carrabili/types/index' },
      { title: 'Crea tipologia pratica', url },
    ]
  }
  if (url.indexOf('/passi-carrabili/types/index') == 0) {
    return [PASSI_CARRABILI_INDEX, { title: 'Lista tipologie pratiche', url }]
  }
  if (url.indexOf('/passi-carrabili/casefiles/index') == 0) {
    return [PASSI_CARRABILI_INDEX]
  }
  return null
}

function checkIsBackAvailable(url: string): boolean {
  if (url.indexOf('/struttura/update/') > -1) {
    return true
  }
  if (url.indexOf('/struttura/preview/') > -1) {
    return true
  }
  if (url.indexOf('/struttura/create') == 0) {
    return true
  }
  if (url.indexOf('/attributi/index') > -1) {
    return true
  }
  if (url.indexOf('/tariffe/index') > -1) {
    return true
  }
  if (url.indexOf('/tariffe/create') > -1) {
    return true
  }
  if (url.indexOf('/prenotazione-sala/view') > -1) {
    return true
  }
  if (url.indexOf('/user-tasks/update/') > -1) {
    return true
  }
  return false
}

export { generateFromUrl, checkIsBackAvailable }
