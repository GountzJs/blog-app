import { environment } from '@env/environment';
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Get Comments for an Article
  http.get(`${environment.apiUrl}/articles/:slug/comments`, () => {
    return HttpResponse.json({}, { status: 200 });
  }),

  // Create Comment for an Article
  http.post(`${environment.apiUrl}/articles/:slug/comments`, () => {
    return HttpResponse.json({}, { status: 200 });
  }),

  // Delete Comment
  http.delete(`${environment.apiUrl}/articles/:slug/comments/:id`, () => {
    return HttpResponse.json({}, { status: 200 });
  }),
];
