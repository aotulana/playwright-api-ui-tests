import test, { expect } from '@playwright/test';
import { postAuthRequest } from '../requests/auth';
import { user } from '../fixtures/data/user';

test.describe('Auth: create token', () => {
  const invalidCredentials = [
    { username: '', password: '' },
    { username: 'admin', password: '' },
    { username: '', password: 'password123' },
    { username: null, password: null },
    {},
  ];

  const validCredential = user;

  invalidCredentials.forEach((invalidCredential) => {
    test(`should return "Bad credentials" for ${JSON.stringify(
      invalidCredential
    )}`, async ({ request }) => {
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
