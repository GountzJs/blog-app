import { environment } from '@env/environment';
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Get Articles Feed
  http.get(`${environment.apiUrl}/articles/feed`, () => {
    return HttpResponse.json({}, { status: 200 });
  }),

  // Get Articles Globally
  http.get(`${environment.apiUrl}/articles`, () => {
    return HttpResponse.json({}, { status: 200 });
  }),

  // Create Article
  http.post(`${environment.apiUrl}/articles`, () => {
    return HttpResponse.json({}, { status: 201 });
  }),

  // Get Article
  http.get(`${environment.apiUrl}/articles/:slug`, () => {
    return HttpResponse.json({}, { status: 200 });
  }),

  // Update Article
  http.put(`${environment.apiUrl}/articles/:slug`, () => {
    return HttpResponse.json({}, { status: 200 });
  }),

  // Delete Article
  http.delete(`${environment.apiUrl}/articles/:slug`, () => {
    return HttpResponse.json({}, { status: 200 });
  }),
];
