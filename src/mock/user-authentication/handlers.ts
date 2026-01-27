import { environment } from '@env/environment';
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Login Existing User
  http.post(`${environment.apiUrl}/users/login`, async () => {
    const response = await fetch(`/data/user.json`);
    const user = await response.json();
    return HttpResponse.json(user, { status: 200 });
  }),

  // Register New User
  http.post(`${environment.apiUrl}/users`, async () => {
    const response = await fetch(`/data/user.json`);
    const user = await response.json();
    return HttpResponse.json(user, { status: 201 });
  }),

  // Get Current User
  http.get(`${environment.apiUrl}/user`, async () => {
    const response = await fetch(`/data/user.json`);
    const user = await response.json();
    return HttpResponse.json(user, { status: 200 });
  }),

  // Update Current User
  http.put(`${environment.apiUrl}/user`, async () => {
    const response = await fetch(`/data/user.json`);
    const user = await response.json();
    return HttpResponse.json(user, { status: 200 });
  }),
];
