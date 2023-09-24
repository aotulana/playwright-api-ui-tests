import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/registration.page';

test('should be able to register new user ', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  await registrationPage.goToRegistrationPage();
  await registrationPage.registerNewUser();
  await expect(registrationPage.successfulSignupText).toBeVisible();
});
