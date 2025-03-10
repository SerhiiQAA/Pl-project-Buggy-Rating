import { test, expect } from '@playwright/test';

const loginInput = 'input[name="login"]';
const passwordInput = 'input[name="password"]';
const loginButton = '.btn-success';

const  firstAvtoCard = '.img-fluid.center-block:nth-of-type(1)'
const  secondAvtoCard = '.img-fluid.center-block:nth-of-type(2)'
const  thirdAvtoCard = '.img-fluid.center-block:nth-of-type(3)'

const  firstAvtoCardTitle = 'h2:nth-of-type(1)'
const  secondAvtoCardTitle = 'h2:nth-of-type(2)'
const  thirdAvtoCardTitle = 'h2:nth-of-type(3)'

const facebookSocialMediaButton = '[title="Facebook"]';
const xSocialMediaButton = '[title="Twitter"]';

const registerButton = '.btn-success-outline';

const warningLabel = '.label-warning';
const validationMessage = 'Please fill out this field.';
const logo = '.navbar-brand';



class MainPage {
    readonly page;

    constructor(page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://buggy.justtestit.org/');
    }

    async checkTitle() {
        await expect(this.page).toHaveTitle("Buggy Cars Rating");
    }

    async checkPlaceholder() {
        expect(await this.page.locator(loginInput).evaluate((el) => (el as HTMLInputElement).placeholder === 'Login')).toBeTruthy();
    }

    async fillLoginDetails(username: string, password: string) {
        await this.page.locator(loginInput).fill(username);
        await this.page.locator(passwordInput).fill(password);
    }

    async clickSubmitButton() {
        await this.page.locator(submitButton).click();
    }

    async checkWarningLabel() {
        await this.page.waitForSelector(warningLabel, { state: 'visible' });
        expect((await this.page.locator(warningLabel).textContent()).trim()).toBe('Invalid username/password');
    }

    async checkValidationMessages() {
        const loginMessage = await this.page.locator(loginInput).evaluate(input => (input as HTMLInputElement).validationMessage);
        expect(loginMessage).toBe(validationMessage);

        const passwordMessage = await this.page.locator(passwordInput).evaluate(input => (input as HTMLInputElement).validationMessage);
        expect(passwordMessage).toBe('');
    }

    async takeScreenshot(path: string) {
        await this.page.screenshot({ path: path });
    }
}

export { MainPage };
