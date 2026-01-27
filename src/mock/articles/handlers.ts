import { http, HttpResponse } from 'msw';

export const handlers = [
  // Get Articles Feed
  http.get('http://localhost:4200/api/articles/feed', () => {
    return HttpResponse.json({}, { status: 200 });
  }),

  // Get Articles Globally
  http.get('http://localhost:4200/api/articles', () => {
    return HttpResponse.json({}, { status: 200 });
  }),

  // Create Article
  http.post('http://localhost:4200/api/articles', () => {
    return HttpResponse.json({}, { status: 201 });
  }),

  // Get Article
  http.get('http://localhost:4200/api/articles/:slug', () => {
    return HttpResponse.json({}, { status: 200 });
  }),

  // Update Article
  http.put('http://localhost:4200/api/articles/:slug', () => {
    return HttpResponse.json({}, { status: 200 });
  }),

  // Delete Article
  http.delete('http://localhost:4200/api/articles/:slug', () => {
    return HttpResponse.json({}, { status: 200 });
  }),
];
