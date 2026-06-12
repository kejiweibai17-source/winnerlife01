// Middleware is no longer needed for i18n routing.
// Chinese pages are served at root (/), Japanese at /jp explicitly.
export function middleware() {}

export const config = {
  matcher: [],
};
