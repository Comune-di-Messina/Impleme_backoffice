import { APP_ROUTING_ACL } from 'src/app/app-routing-acl'

export const getMenuData: any[] = [
  {
    category: true,
    title: 'Attività',
  },
  {
    title: 'Prenotazione sale',
    key: 'user-tasks',
    icon: 'fas fa-ticket-alt',
    roles: APP_ROUTING_ACL['prenotame'],
    // count: 1,
    children: [
      {
        title: 'Da prendere in carico',
        key: 'user-tasks-demandable',
        url: '/user-tasks/demandable',
        roles: APP_ROUTING_ACL['user-tasks/claim'],
      },
      {
        title: 'Prese in carico',
        key: 'user-tasks-assignee',
        url: '/user-tasks/assignee',
        roles: APP_ROUTING_ACL['user-tasks/complete'],
      },
      {
        title: 'Tutte le prenotazioni',
        key: 'prenotazione-sala-index',
        url: '/bookings/index',
        roles: APP_ROUTING_ACL['struttura/preview'],
      },
      {
        title: 'Strutture prenotabili',
        icon: 'fas fa-cog',
        children: [
          {
            title: 'Gestione spazi',
            key: 'struttura-index',
            url: '/struttura/index',
            roles: APP_ROUTING_ACL['struttura/preview'],
            icon: 'fas fa-landmark',
          },
          {
            title: 'Categorie spazi',
            key: 'struttura-categoria-index',
            url: '/struttura/categoria/index',
            roles: APP_ROUTING_ACL['struttura/categoria/index'],
          },
          {
            title: 'Tipologie spazi',
            key: 'struttura-tipologia-index',
            url: '/struttura/tipologia/index',
            roles: APP_ROUTING_ACL['struttura/tipologia/index'],
          },
        ],
      },
    ],
  },
  {
    title: 'SegnalaME',
    key: 'segnalame',
    icon: 'far fa-comments',
    roles: APP_ROUTING_ACL['segnalame'],
    // roles: ['admin'], // set user roles with access to this route
    // count: 1,
    children: [
      {
        title: 'Segnalazioni',
        key: 'segnalame-segnalazioni',
        url: '/segnalame/reportings',
      },
      {
        title: 'Configurazione',
        key: 'segnalame-settings',
        roles: APP_ROUTING_ACL['segnalame/settings'],
        children: [
          {
            title: 'Enti',
            key: 'segnalame-institutes',
            url: '/segnalame/settings/institutes',
          },
        ],
      },
    ],
  },
  {
    title: 'PrenotaUfficio',
    key: 'prenota-ufficio',
    icon: 'far fa-building',
    roles: APP_ROUTING_ACL['prenotaUfficio'],
    // roles: ['admin'], // set user roles with access to this route
    // count: 1,
    children: [
      {
        title: 'Prenotazioni',
        key: 'prenota-ufficio-prenotazioni',
        url: '/prenota-ufficio/reservations',
      },
      {
        title: 'Configurazione',
        key: 'prenota-ufficio-settings',
        roles: APP_ROUTING_ACL['prenotaUfficio/settings'],
        children: [
          {
            title: 'Uffici',
            key: 'prenota-ufficio-offices',
            url: '/prenota-ufficio/offices',
          },
          {
            title: 'Servizi',
            key: 'prenota-ufficio-services',
            url: '/prenota-ufficio/services',
          },
        ],
      },
    ],
  },
  {
    title: 'Report pagamenti',
    key: 'user-tasks',
    icon: 'fas fa-file-invoice',
    roles: APP_ROUTING_ACL['report-pagamenti/download-csv'], // set user roles with access to this route
    // count: 1,
    children: [
      {
        title: 'Scarica report CSV',
        key: 'report-pagamenti-download-csv',
        url: '/report-pagamenti/download-csv',
      },
    ],
  },
  {
    title: 'Tributi',
    key: 'tributi',
    icon: 'fas fa-euro-sign',
    roles: APP_ROUTING_ACL['tributi/index'],
    url: '/tributi/index',
  },
  {
    title: 'Passi Carrabili',
    key: 'passi-carrabili',
    icon: 'fas fa-ban',
    roles: APP_ROUTING_ACL['passicarrabili/index'],
    // count: 1,
    children: [
      {
        title: 'Da prendere in carico',
        key: 'passi-carrabili-demandable',
        url: '/passi-carrabili/casefiles/demandable',
        roles: APP_ROUTING_ACL['passicarrabili/index'],
      },
      {
        title: 'Prese in carico',
        key: 'passi-carrabili-assignee',
        url: '/passi-carrabili/casefiles/assignee',
        roles: APP_ROUTING_ACL['passicarrabili/index'],
      },
      {
        title: 'Tutte le richieste',
        key: 'passi-carrabili-richieste',
        url: '/passi-carrabili/casefiles/index',
        roles: APP_ROUTING_ACL['passicarrabili/index'],
      },
      {
        title: 'Tipologie pratiche',
        key: 'passi-carrabili-tipologia-index',
        url: '/passi-carrabili/types/index',
        roles: APP_ROUTING_ACL['passicarrabili/index'],
      },
      // {
      //   title: 'Configurazione',
      //   key: 'prenota-ufficio-settings',
      //   roles: APP_ROUTING_ACL['prenotaUfficio/settings'],
      //   children: [
      //     {
      //       title: 'Uffici',
      //       key: 'prenota-ufficio-offices',
      //       url: '/prenota-ufficio/offices',
      //     },
      //     {
      //       title: 'Servizi',
      //       key: 'prenota-ufficio-services',
      //       url: '/prenota-ufficio/services',
      //     },
      //   ],
      // },
    ],
  },
]
