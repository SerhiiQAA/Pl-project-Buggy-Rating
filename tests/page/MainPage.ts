import { test, expect } from '@playwright/test';

const loginInput = 'input[name="login"]';
const passwordInput = 'input[name="password"]';
const loginButton = '.btn-success';
const registerButton = '.btn-success-outline';

const firstAvtoCard = '.img-fluid.center-block:nth-of-type(1)';
const secondAvtoCard = '.img-fluid.center-block:nth-of-type(2)';
const thirdAvtoCard = '.img-fluid.center-block:nth-of-type(3)';

const firstAvtoCardTitle = 'h2:nth-of-type(1)';
const secondAvtoCardTitle = 'h2:nth-of-type(2)';
const thirdAvtoCardTitle = 'h2:nth-of-type(3)';

const facebookSocialMediaButton = '[title="Facebook"]';
const xSocialMediaButton = '[title="Twitter"]';

const warningLabel = '.label-warning';
const validationMessageLogin = 'Please fill out this field.';
const validationMessagePassword = 'Please fill out this field.';
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

    async clickLogo() {
        await this.page.locator(logo).click();
    }
    

    async checkPlaceholder() {
        expect(await this.page.locator(loginInput).evaluate((el) => (el as HTMLInputElement).placeholder === 'Login')).toBeTruthy();
    }

    async fillLoginDetails(username: string, password: string) {
        await this.page.locator(loginInput).fill(username);
        await this.page.locator(passwordInput).fill(password);
    }

    async clickLoginButton() {
        await this.page.locator(loginButton).click();
    }

    async clickRegisterButton() {
        await this.page.locator(registerButton).click();
    }

    async checkWarningLabel() {
        await this.page.waitForSelector(warningLabel, { state: 'visible' });
        expect((await this.page.locator(warningLabel).textContent()).trim()).toBe('Invalid username/password');
    }

    async checkValidationMessagesLogin() {
        const loginMessage = await this.page.locator(loginInput).evaluate(input => (input as HTMLInputElement).validationMessage);
        expect(loginMessage).toBe(validationMessageLogin);

        const passwordMessage = await this.page.locator(passwordInput).evaluate(input => (input as HTMLInputElement).validationMessage);
        expect(passwordMessage).toBe(validationMessagePassword);
    }

    async takeScreenshot(path: string) {
        await this.page.screenshot({ path: path });
    }

    async getFirstAvtoCardTitle() {
        return await this.page.locator(firstAvtoCardTitle).textContent();
    }
    
    async getSecondAvtoCardTitle() {
        return await this.page.locator(secondAvtoCardTitle).textContent();
    }
    
    async getThirdAvtoCardTitle() {
        return await this.page.locator(thirdAvtoCardTitle).textContent();
    }    

    async clickFirstAvtoCard() {
        await this.page.locator(firstAvtoCard).click();
    }

    async clickSecondAvtoCard() {
        await this.page.locator(secondAvtoCard).click();
    }

    async clickThirdAvtoCard() {
        await this.page.locator(thirdAvtoCard).click();
    }

    async getTitle(selector: string) {
        return await this.page.locator(selector).textContent();
    }

    async clickFacebookButton() {
        await this.page.locator(facebookSocialMediaButton).click();
    }

    async clickXButton() {
        await this.page.locator(xSocialMediaButton).click();
    }
}

export { MainPage };


