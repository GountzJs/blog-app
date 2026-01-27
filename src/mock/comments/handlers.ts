import { http, HttpResponse } from 'msw';

export const handlers = [
  // Get Comments for an Article
  http.get('http://localhost:4200/api/articles/:slug/comments', () => {
    return HttpResponse.json({}, { status: 200 });
  }),

  // Create Comment for an Article
  http.post('http://localhost:4200/api/articles/:slug/comments', () => {
    return HttpResponse.json({}, { status: 200 });
  }),

  // Delete Comment
  http.delete('http://localhost:4200/api/articles/:slug/comments/:id', () => {
    return HttpResponse.json({}, { status: 200 });
  }),
];
