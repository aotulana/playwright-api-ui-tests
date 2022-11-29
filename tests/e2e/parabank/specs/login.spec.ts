import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

test('user with valid credentials should be able to login', async ({
  page,
}) => {
  const username = 'john';
  const password = 'demo';

  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await loginPage.login(username, password);
  expect(loginPage.welcomeText).toBeTruthy();
});

test('new user should be able to register', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await loginPage.registerNewUser();
  expect(loginPage.welcomeText).toBeTruthy();
});
