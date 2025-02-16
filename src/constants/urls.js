export const urls = {
  auth: {
    login: "/auth",
    user: "/users",
  },
  user: {
    edit: (id) => `users/${id}`,
  },
  sets: {
    get: "/sets",
    post: "/sets",
    edit: (id) => `/sets/${id}`,
  },
  card_icons: {
    get: "/card_icons",
    posts: "/card_icons",
  },
  icons: {
    icon: "/card_icons",
  },
};
