import { http, HttpResponse } from 'msw';

export const handlers = [
  // Get Profile
  http.get('http://localhost:4200/api/profiles/:username', async () => {
    const response = await fetch('http://localhost:4200/data/profiles.json');
    const profile = await response.json();
    return HttpResponse.json(profile, { status: 200 });
  }),

  // Follow User
  http.post('http://localhost:4200/api/profiles/:username/follow', async () => {
    const response = await fetch('http://localhost:4200/data/profiles.json');
    const profile = await response.json();
    profile.profile.following = true;
    return HttpResponse.json(profile, { status: 200 });
  }),

  // Unfollow User
  http.delete('http://localhost:4200/api/profiles/:username/follow', async () => {
    const response = await fetch('http://localhost:4200/data/profiles.json');
    const profile = await response.json();
    profile.profile.following = false;
    return HttpResponse.json(profile, { status: 200 });
  }),
];
