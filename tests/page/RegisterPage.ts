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

    get successMessage(): Locator {
        return this.page.locator(this.successMessageAfterRegistrationSelector);
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

    async fillForm(fields: { [key: string]: string | undefined }) {
        const locators = {
            login: this.loginField,
            firstName: this.firstNameField,
            lastName: this.lastNameField,
            password: this.passwordField,
            confirmPassword: this.confirmPasswordField,
        };
    
        for (const [key, value] of Object.entries(fields)) {
            if (value !== undefined) {
                await this.fillField(locators[key], value);
            }
        }
    }

    async clickRegisterButton() {
        await this.registerButton.click();
    } 

    async getPasswordMismatchError(): Promise<string | null> {
        return this.errorMessageForPasswords.textContent();
    }
}

export { RegisterPage };
