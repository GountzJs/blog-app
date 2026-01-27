import { http, HttpResponse } from 'msw';

export const handlers = [
  // Get Tags
  http.get('http://localhost:4200/api/tags', async () => {
    const response = await fetch('http://localhost:4200/data/tags.json');
    const tags = await response.json();
    return HttpResponse.json(tags, { status: 200 });
  }),
];
