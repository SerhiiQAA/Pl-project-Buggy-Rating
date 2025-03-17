import { Page, Locator } from '@playwright/test';

class RegisterPage {
    constructor(private page: Page) {}

    get loginField(): Locator {
        return this.page.locator('#username');
    }

    get firstNameField(): Locator {
        return this.page.locator('#firstName');
    }

    get lastNameField(): Locator {
        return this.page.locator('#lastName');
    }

    get passwordField(): Locator {
        return this.page.locator('#password');
    }

    get confirmPasswordField(): Locator {
        return this.page.locator('#confirmPassword');
    }

    get registerButton(): Locator {
        return this.page.locator('.btn-default');
    }

    get successMessage(): Locator {
        return this.page.locator('.result');
    }

    get errorMessageForPasswords(): Locator {
        return this.page.locator('(//div[@class="alert alert-danger"])[6]');
    }

    async goto() {
        await this.page.goto('/register');
    }

    async fillForm(fields: Partial<RegisterFields>) {
        if (fields.login) await this.loginField.fill(fields.login);
        if (fields.firstName) await this.firstNameField.fill(fields.firstName);
        if (fields.lastName) await this.lastNameField.fill(fields.lastName);
        if (fields.password) await this.passwordField.fill(fields.password);
        if (fields.confirmPassword) await this.confirmPasswordField.fill(fields.confirmPassword);
    }

    async clickRegisterButton() {
        await this.registerButton.click();
    }

    async getPasswordMismatchError(): Promise<string | null> {
        return this.errorMessageForPasswords.textContent();
    }

    async getSuccessMessage(): Promise<string | null> {
        return this.successMessage.textContent();
    }
}

interface RegisterFields {
    login: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
}

export { RegisterPage };
