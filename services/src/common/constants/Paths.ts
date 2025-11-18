
export default {
  Base: '/api/v1',
  Users: {
    Base: '/users',
  },
  Session: {
    Base: '/sessions',
    Me: '/me',
    SessionId: '/:sessionId',
    Check: '/check',
  },
  Auth: {
    Base: '/auth',
    Me: '/login',
  },
  Rooms: {
    Base: '/rooms',
  },
  Stations: {
    Base: '/work-stations',
  },
  Entities: {
    Base: '/entities'
  }
} as const;
