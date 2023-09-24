import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login', () => {
  test('should be able to login user with valid credentials ', async ({
    page,
  }) => {
    const username = process.env.E2E_USERNAME;
    const password = process.env.E2E_PASSWORD;

    const loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.login(username, password);
    await expect(loginPage.welcomeText).toBeVisible();
  });

  test('should not be able to login user with invalid credentials ', async ({
    page,
  }) => {
    const username = 'invalid';
    const password = 'user';

    const loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.login(username, password);
    await expect(loginPage.loginErrorMessage).toBeVisible();
  });
});
