import { Locator, Page, selectors } from '@playwright/test';
import { userDetails } from '../fixtures/user-registration';

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

  constructor(page: Page) {
    this.page = page;

    //login form
    this.loginUsernameInput = page.locator('[name=username]');
    this.loginPasswordInput = page.locator('[name=password]');
    this.loginButton = page.getByRole('button', { name: 'Log In' });
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.welcomeText = page.getByText('Welcome');

    //registeration form
    selectors.setTestIdAttribute('id');
    this.firstNameInput = page.getByTestId('customer.firstName');
    this.lastNameInput = page.getByTestId('customer.lastName');
    this.addressInput = page.getByTestId('customer.address.street');
    this.cityInput = page.getByTestId('customer.address.city');
    this.stateInput = page.getByTestId('customer.address.state');
    this.zipCodeInput = page.getByTestId('customer.address.zipCode');
    this.phoneNumberInput = page.getByTestId('customer.phoneNumber');
    this.ssnInput = page.getByTestId('customer.ssn');
    this.registerationUsernameInput = page.getByTestId('customer.username');
    this.registerationPasswordInput = page.getByTestId('customer.password');
    this.registerationconfirmPasswordInput =
      page.getByTestId('repeatedPassword');
    this.registerButton = page.locator('input:has-text("Register")');
    this.successfulSignupText = page.getByText(
      'Your account was created successfully. You are now logged in.'
    );
  }

  async goToLoginPage() {
    await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');
  }

  async login(username: string, password: string) {
    await this.loginUsernameInput.fill(username);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  async registerNewUser() {
    await this.registerLink.click();
    await this.firstNameInput.fill(userDetails.firstName);
    await this.lastNameInput.fill(userDetails.lastName);
    await this.addressInput.fill(userDetails.address);
    await this.cityInput.fill(userDetails.city);
    await this.stateInput.fill(userDetails.state);
    await this.zipCodeInput.fill(userDetails.zipCode);
    await this.phoneNumberInput.fill(userDetails.phoneNumber);
    await this.ssnInput.fill(userDetails.ssn);
    await this.registerationUsernameInput.fill(userDetails.username);
    await this.registerationPasswordInput.fill(userDetails.password);
    await this.registerationconfirmPasswordInput.fill(userDetails.password);
    await this.registerButton.click();
  }
}
