import { test, expect } from '@playwright/test';

const loginInput = 'input[name="login"]';
const passwordInput = 'input[name="password"]';
const submitButton = '.btn-success';
const warningLabel = '.label-warning';
const validationMessage = 'Please fill out this field.';

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
