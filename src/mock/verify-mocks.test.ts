import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { handlers as articlesHandlers } from './articles/handlers';
import { handlers as commentsHandlers } from './comments/handlers';
import { handlers as favoritesHandlers } from './favorites/handlers';
import { handlers as profileHandlers } from './profile/handlers';
import { handlers as tagsHandlers } from './tags/handlers';
import { handlers as userAuthenticationHandlers } from './user-authentication/handlers';

const handlers = [
  ...articlesHandlers,
  ...commentsHandlers,
  ...favoritesHandlers,
  ...profileHandlers,
  ...tagsHandlers,
  ...userAuthenticationHandlers,
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('API Mocks Verification', () => {
  // User Authentication
  it('intercepts POST /api/users/login', async () => {
    const response = await fetch('http://localhost:4200/api/users/login', { method: 'POST' });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({});
  });

  it('intercepts POST /api/users', async () => {
    const response = await fetch('http://localhost:4200/api/users', { method: 'POST' });
    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({});
  });

  it('intercepts GET /api/user', async () => {
    const response = await fetch('http://localhost:4200/api/user');
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({});
  });

  it('intercepts PUT /api/user', async () => {
    const response = await fetch('http://localhost:4200/api/user', { method: 'PUT' });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({});
  });

  // Profile
  it('intercepts GET /api/profiles/:username', async () => {
    const response = await fetch('http://localhost:4200/api/profiles/johndoe');
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({});
  });

  it('intercepts POST /api/profiles/:username/follow', async () => {
    const response = await fetch('http://localhost:4200/api/profiles/johndoe/follow', {
      method: 'POST',
    });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({});
  });

  it('intercepts DELETE /api/profiles/:username/follow', async () => {
    const response = await fetch('http://localhost:4200/api/profiles/johndoe/follow', {
      method: 'DELETE',
    });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({});
  });

  // Articles
  it('intercepts GET /api/articles', async () => {
    const response = await fetch('http://localhost:4200/api/articles');
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({});
  });

  it('intercepts GET /api/articles/feed', async () => {
    const response = await fetch('http://localhost:4200/api/articles/feed');
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({});
  });

  it('intercepts POST /api/articles', async () => {
    const response = await fetch('http://localhost:4200/api/articles', { method: 'POST' });
    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({});
  });

  it('intercepts GET /api/articles/:slug', async () => {
    const response = await fetch('http://localhost:4200/api/articles/some-slug');
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({});
  });

  it('intercepts PUT /api/articles/:slug', async () => {
    const response = await fetch('http://localhost:4200/api/articles/some-slug', { method: 'PUT' });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({});
  });

  it('intercepts DELETE /api/articles/:slug', async () => {
    const response = await fetch('http://localhost:4200/api/articles/some-slug', {
      method: 'DELETE',
    });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({});
  });

  // Comments
  it('intercepts GET /api/articles/:slug/comments', async () => {
    const response = await fetch('http://localhost:4200/api/articles/some-slug/comments');
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({});
  });

  it('intercepts POST /api/articles/:slug/comments', async () => {
    const response = await fetch('http://localhost:4200/api/articles/some-slug/comments', {
      method: 'POST',
    });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({});
  });

  it('intercepts DELETE /api/articles/:slug/comments/:id', async () => {
    const response = await fetch('http://localhost:4200/api/articles/some-slug/comments/1', {
      method: 'DELETE',
    });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({});
  });

  // Favorites
  it('intercepts POST /api/articles/:slug/favorite', async () => {
    const response = await fetch('http://localhost:4200/api/articles/some-slug/favorite', {
      method: 'POST',
    });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({});
  });

  it('intercepts DELETE /api/articles/:slug/favorite', async () => {
    const response = await fetch('http://localhost:4200/api/articles/some-slug/favorite', {
      method: 'DELETE',
    });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({});
  });

  // Tags
  it('intercepts GET /api/tags', async () => {
    const response = await fetch('http://localhost:4200/api/tags');
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({});
  });
});
