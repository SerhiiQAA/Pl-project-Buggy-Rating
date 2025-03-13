import { Page, Locator } from '@playwright/test';

class RegisterPage {
    private page: Page;

    private loginFieldSelector: string = '#username';
    private firstNameFieldSelector: string = '#firstName';
    private lastNameFieldSelector: string = '#lastName';
    private passwordFieldSelector: string = '#password';
    private confirmPasswordFieldSelector: string = '#confirmPassword';
    private registerButtonSelector: string = '.btn-default';
    private errorMessageForPasswordsSelector: string = '(//div[@class="alert alert-danger"])[6]';
    private successMessageAfterRegistrationSelector: string = '.result';

    constructor(page: Page) {
        this.page = page;
    }

    get loginField(): Locator {
        return this.page.locator(this.loginFieldSelector);
    }

    get firstNameField(): Locator {
        return this.page.locator(this.firstNameFieldSelector);
    }

    get lastNameField(): Locator {
        return this.page.locator(this.lastNameFieldSelector);
    }

    get passwordField(): Locator {
        return this.page.locator(this.passwordFieldSelector);
    }

    get confirmPasswordField(): Locator {
        return this.page.locator(this.confirmPasswordFieldSelector);
    }

    get registerButton(): Locator {
        return this.page.locator(this.registerButtonSelector);
    }

    get errorMessageForPasswords(): Locator {
        return this.page.locator(this.errorMessageForPasswordsSelector);
    }

    async goto() {
        await this.page.goto('/register');
    }

    async fillField(locator: Locator, value: string | undefined) {
        if (value !== undefined) {
            await locator.fill(value);
        }
    }

    async fillForm({
        login,
        firstName,
        lastName,
        password,
        confirmPassword,
    }: {
        login?: string;
        firstName?: string;
        lastName?: string;
        password?: string;
        confirmPassword?: string;
    }) {
        await this.fillField(this.loginField, login);
        await this.fillField(this.firstNameField, firstName);
        await this.fillField(this.lastNameField, lastName);
        await this.fillField(this.passwordField, password);
        await this.fillField(this.confirmPasswordField, confirmPassword);
    }

    async clickRegisterButton() {
        await this.registerButton.click();
    }

    async isRegisterButtonDisabled(): Promise<boolean> {
        return this.registerButton.isDisabled();
    }

    getSuccessMessageLocator(): Locator {
        return this.page.locator(this.successMessageAfterRegistrationSelector);
    }
    

    async getPasswordMismatchError(): Promise<string | null> {
        return this.errorMessageForPasswords.textContent();
    }
}

export { RegisterPage };
