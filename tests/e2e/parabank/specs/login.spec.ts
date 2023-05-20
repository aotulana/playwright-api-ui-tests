import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login', () => {
  test('should be able to login user with valid credentials ', async ({
    page,
  }) => {
    const username = 'john';
    const password = 'demo';

    const loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.login(username, password);
    expect(loginPage.welcomeText).toBeTruthy();
  });

  test('should be able to register new user ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.registerNewUser();
    expect(loginPage.successfulSignupText).toBeTruthy();
  });
});
