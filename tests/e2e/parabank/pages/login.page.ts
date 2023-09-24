import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginUsernameInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly welcomeText: Locator;
  readonly registerLink: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly ssnInput: Locator;
  readonly registerationUsernameInput: Locator;
  readonly registerationPasswordInput: Locator;
  readonly registerationconfirmPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly successfulSignupText: Locator;
  readonly loginErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    //login form
    this.loginUsernameInput = page.locator('[name=username]');
    this.loginPasswordInput = page.locator('[name=password]');
    this.loginButton = page.getByRole('button', { name: 'Log In' });
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.welcomeText = page.getByText('Welcome');
    this.loginErrorMessage = page.getByText(
      'The username and password could not be verified.'
    );
  }

  async goToLoginPage() {
    await this.page.goto('/parabank/index.htm');
  }

  async login(username: string, password: string) {
    await this.loginUsernameInput.fill(username);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }
}
