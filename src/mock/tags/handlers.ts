import { http, HttpResponse } from 'msw';

export const handlers = [
  // Get Tags
  http.get('http://localhost:4200/api/tags', () => {
    return HttpResponse.json({}, { status: 200 });
  }),
];
