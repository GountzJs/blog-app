import { environment } from '@env/environment';
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Favorite Article
  http.post(`${environment.apiUrl}/articles/:slug/favorite`, () => {
    return HttpResponse.json({}, { status: 200 });
  }),

  // Unfavorite Article
  http.delete(`${environment.apiUrl}/articles/:slug/favorite`, () => {
    return HttpResponse.json({}, { status: 200 });
  }),
];
