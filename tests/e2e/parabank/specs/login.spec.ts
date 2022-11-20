import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

test('homepage has title and links to intro page', async ({ page }) => {
  const username = "john";
  const password = "demo";

  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await loginPage.login(username, password);
})