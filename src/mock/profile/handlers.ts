import { http, HttpResponse } from 'msw';

export const handlers = [
  // Get Profile
  http.get('http://localhost:4200/api/profiles/:username', () => {
    return HttpResponse.json({}, { status: 200 });
  }),

  // Follow User
  http.post('http://localhost:4200/api/profiles/:username/follow', () => {
    return HttpResponse.json({}, { status: 200 });
  }),

  // Unfollow User
  http.delete('http://localhost:4200/api/profiles/:username/follow', () => {
    return HttpResponse.json({}, { status: 200 });
  }),
];
