
export default {
  Base: '/api/v1',
  Users: {
    Base: '/users',
  },
  Session: {
    Base: '/sessions',
    Me: '/me',
  },
  Auth: {
    Base: '/auth',
    Me: '/login',
  },
} as const;
