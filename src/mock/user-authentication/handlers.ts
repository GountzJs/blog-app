import { http, HttpResponse } from 'msw';

export const handlers = [
  // Login Existing User
  http.post('http://localhost:4200/api/users/login', () => {
    return HttpResponse.json({}, { status: 200 });
  }),

  // Register New User
  http.post('http://localhost:4200/api/users', () => {
    return HttpResponse.json({}, { status: 201 });
  }),

  // Get Current User
  http.get('http://localhost:4200/api/user', () => {
    return HttpResponse.json({}, { status: 200 });
  }),

  // Update Current User
  http.put('http://localhost:4200/api/user', () => {
    return HttpResponse.json({}, { status: 200 });
  }),
];
