import { setupWorker } from 'msw/browser';
import { handlers as articlesHandlers } from './articles/handlers';
import { handlers as commentsHandlers } from './comments/handlers';
import { handlers as favoritesHandlers } from './favorites/handlers';
import { handlers as profileHandlers } from './profile/handlers';
import { handlers as tagsHandlers } from './tags/handlers';
import { handlers as userAuthenticationHandlers } from './user-authentication/handlers';

export const worker = setupWorker(
  ...articlesHandlers,
  ...commentsHandlers,
  ...favoritesHandlers,
  ...profileHandlers,
  ...tagsHandlers,
  ...userAuthenticationHandlers,
);
