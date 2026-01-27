import { http, HttpResponse } from 'msw';

export const handlers = [
  // Favorite Article
  http.post('http://localhost:4200/api/articles/:slug/favorite', () => {
    return HttpResponse.json({}, { status: 200 });
  }),

  // Unfavorite Article
  http.delete('http://localhost:4200/api/articles/:slug/favorite', () => {
    return HttpResponse.json({}, { status: 200 });
  }),
];
