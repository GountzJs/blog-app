import { environment } from '@env/environment';
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Get Profile
  http.get(`${environment.apiUrl}/profiles/:username`, async () => {
    const response = await fetch('/data/profiles.json');
    const profile = await response.json();
    return HttpResponse.json(profile, { status: 200 });
  }),

  // Follow User
  http.post(`${environment.apiUrl}/profiles/:username/follow`, async () => {
    const response = await fetch(`/data/profiles.json`);
    const profile = await response.json();
    profile.profile.following = true;
    return HttpResponse.json(profile, { status: 200 });
  }),

  // Unfollow User
  http.delete(`${environment.apiUrl}/profiles/:username/follow`, async () => {
    const response = await fetch(`/data/profiles.json`);
    const profile = await response.json();
    profile.profile.following = false;
    return HttpResponse.json(profile, { status: 200 });
  }),
];
