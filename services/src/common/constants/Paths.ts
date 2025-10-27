
export default {
  Base: '/api/v1',
  Users: {
    Base: '/users',
  },
  Session: {
    Base: '/sessions',
    Me: '/me',
    SessionId: '/:sessionId',
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
} as const;
