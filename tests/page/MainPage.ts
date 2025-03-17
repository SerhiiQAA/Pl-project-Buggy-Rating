import { Page, Locator } from '@playwright/test';

class MainPage {
    constructor(private page: Page) {}

    get loginInput(): Locator {
        return this.page.locator('input[name="login"]');
    }

    get passwordInput(): Locator {
        return this.page.locator('input[name="password"]');
    }

    get loginButton(): Locator {
        return this.page.locator('.btn-success');
    }

    get registerButton(): Locator {
        return this.page.locator('.btn-success-outline');
    }

    get warningLabel(): Locator {
        return this.page.locator('.label-warning');
    }

    get logo(): Locator {
        return this.page.locator('.navbar-brand');
    }

    get hiMessageAccount(): Locator {
        return this.page.locator('.nav-item:nth-of-type(1)');
    }

    get logoutButton(): Locator {
        return this.page.locator('(//a[@class="nav-link"])[2]');
    }

    get avtoCards(): Locator[] {
        return [
            this.page.locator('.img-fluid.center-block:nth-of-type(1)'),
            this.page.locator('.img-fluid.center-block:nth-of-type(2)'),
            this.page.locator('.img-fluid.center-block:nth-of-type(3)')
        ];
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

    async clickLogo() {
        await this.logo.click();
    }

    async getWarningLabelText(): Promise<string | null> {
        return await this.warningLabel.textContent();
    }

    async getValidationMessage(locator: Locator): Promise<string> {
        return await locator.evaluate(input => (input as HTMLInputElement).validationMessage);
    }
}

export { MainPage };

