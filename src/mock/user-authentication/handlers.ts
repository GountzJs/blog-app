import { http, HttpResponse } from 'msw';

export const handlers = [
  // Login Existing User
  http.post('http://localhost:4200/api/users/login', async () => {
    const response = await fetch('http://localhost:4200/data/user.json');
    const user = await response.json();
    return HttpResponse.json(user, { status: 200 });
  }),

  // Register New User
  http.post('http://localhost:4200/api/users', async () => {
    const response = await fetch('http://localhost:4200/data/user.json');
    const user = await response.json();
    return HttpResponse.json(user, { status: 201 });
  }),

  // Get Current User
  http.get('http://localhost:4200/api/user', async () => {
    const response = await fetch('http://localhost:4200/data/user.json');
    const user = await response.json();
    return HttpResponse.json(user, { status: 200 });
  }),

  // Update Current User
  http.put('http://localhost:4200/api/user', async () => {
    const response = await fetch('http://localhost:4200/data/user.json');
    const user = await response.json();
    return HttpResponse.json(user, { status: 200 });
  }),
];
