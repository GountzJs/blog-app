import { environment } from '@env/environment';
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Get Tags
  http.get(`${environment.apiUrl}/tags`, async () => {
    const response = await fetch(`/data/tags.json`);
    const tags = await response.json();
    return HttpResponse.json(tags, { status: 200 });
  }),
];
