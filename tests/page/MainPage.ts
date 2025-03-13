import { Page, Locator } from '@playwright/test';

class MainPage {
    private page: Page;

    private loginInputSelector: string = 'input[name="login"]';
    private passwordInputSelector: string = 'input[name="password"]';
    private loginButtonSelector: string = '.btn-success';
    private registerButtonSelector: string = '.btn-success-outline';
    private firstAvtoCardSelector: string = '.img-fluid.center-block:nth-of-type(1)';
    private secondAvtoCardSelector: string = '.img-fluid.center-block:nth-of-type(2)';
    private thirdAvtoCardSelector: string = '.img-fluid.center-block:nth-of-type(3)';
    private warningLabelSelector: string = '.label-warning';
    private logoSelector: string = '.navbar-brand';
    private hiMessageAccountSelector: string = '.nav-item:nth-of-type(1)';
    private logoutButtonSelector: string = '(//a[@class="nav-link"])[2]';

    constructor(page: Page) {
        this.page = page;
    }

    get loginInput(): Locator {
        return this.page.locator(this.loginInputSelector);
    }

    get passwordInput(): Locator {
        return this.page.locator(this.passwordInputSelector);
    }

    get loginButton(): Locator {
        return this.page.locator(this.loginButtonSelector);
    }

    get warningLabel(): Locator {
        return this.page.locator(this.warningLabelSelector);
    }

    get logo(): Locator {
        return this.page.locator(this.logoSelector);
    }

    get hiMessageAccount(): Locator {
        return this.page.locator(this.hiMessageAccountSelector);
    }

    getLogoutButtonLocator(): Locator {
        return this.page.locator(this.logoutButtonSelector);
    }

    async goto() {
        await this.page.goto('/');
    }

    async fillLoginDetails(username: string, password: string) {
        await this.loginInput.fill(username);
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    // async clickLogoutButton() {
    //     await this.logoutButton.click();
    // }

    async clickLogo() {
        await this.logo.click();
    }

    async getWarningLabelText(): Promise<string | null> {
        return await this.warningLabel.textContent();
    }

    async getLoginFieldValidationMessage(): Promise<string> {
        return await this.loginInput.evaluate(input => (input as HTMLInputElement).validationMessage);
    }

    async getPasswordFieldValidationMessage(): Promise<string> {
        return await this.passwordInput.evaluate(input => (input as HTMLInputElement).validationMessage);
    }
}

export { MainPage };
