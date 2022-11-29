import { Locator, Page } from '@playwright/test';
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

  constructor(page: Page) {
    this.page = page;

    //login form
    this.loginUsernameInput = page.locator('[name=username]');
    this.loginPasswordInput = page.locator('[name=password]');
    this.loginButton = page.locator('input:has-text("Log in")');
    this.registerLink = page.locator('a:has-text("Register")');
    this.welcomeText = page.locator('b:has-text("Welcome")');

    //registeration form
    this.firstNameInput = page.locator('id=customer.firstName');
    this.lastNameInput = page.locator('id=customer.lastName');
    this.addressInput = page.locator('id=customer.address.street');
    this.cityInput = page.locator('id=customer.address.city');
    this.stateInput = page.locator('id=customer.address.state');
    this.zipCodeInput = page.locator('id=customer.address.zipCode');
    this.phoneNumberInput = page.locator('id=customer.phoneNumber');
    this.ssnInput = page.locator('id=customer.ssn');
    this.registerationUsernameInput = page.locator('id=customer.username');
    this.registerationPasswordInput = page.locator('id=customer.password');
    this.registerationconfirmPasswordInput = page.locator(
      'id=repeatedPassword'
    );
    this.registerButton = page.locator('input:has-text("Register")');
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
