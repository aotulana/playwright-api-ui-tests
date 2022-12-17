import test, { APIRequestContext, expect } from '@playwright/test';

test.use({
  baseURL: 'https://restful-booker.herokuapp.com',
  extraHTTPHeaders: { 'Content-Type': 'application/json' },
});

const postAuthRequest = async (request: APIRequestContext, data: {}) => {
  return await request.post('/auth', {
    data,
  });
};

test.describe('Auth: create token', () => {
  const invalidCredentials = [
    { username: '', password: '' },
    { username: 'admin', password: '' },
    { username: '', password: 'password123' },
    { username: null, password: null },
    {},
  ];

  const validCredential = {
    username: 'admin',
    password: 'password123',
  };

  invalidCredentials.forEach((invalidCredential) => {
    test(`should return "Bad credentials" for "${invalidCredential.username}" and "${invalidCredential.password}"`, async ({
      request,
    }) => {
      const response = await postAuthRequest(request, invalidCredential);

      expect(await response.json()).toHaveProperty('reason', 'Bad credentials');
    });
  });

  test('should return token', async ({ request }) => {
    const response = await postAuthRequest(request, validCredential);
    await expect(response).toBeOK();
    expect(await response.json()).toHaveProperty('token');
  });
});
