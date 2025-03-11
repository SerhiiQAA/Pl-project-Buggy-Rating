import { test, expect } from '@playwright/test';

const loginField = '#username';
const firstNameField = '#firstName';
const lastNameField = '#lastName';
const passwordField = '#password';
const confirmPasswordField = '#confirmPassword';

const registerButton = '.btn-default';
const cancelButton = 'a.btn:nth-child(7)';

const errorMessage = '.result';
const errorMessageForLogin = '(//div[@class="alert alert-danger"])[1]';
const errorMessageForFirstName = '(//div[@class="alert alert-danger"])[2]';
const errorMessageForLastName = '(//div[@class="alert alert-danger"])[3]';
const errorMessageForPassword = '(//div[@class="alert alert-danger"])[4]';
const errorMessageForConfirmPassword = '(//div[@class="alert alert-danger"])[5]';
const errorMessageForPasswords = '(//div[@class="alert alert-danger"])[6]';

class RegisterPage {
    readonly page;

    constructor(page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://buggy.justtestit.org/register');
    }

    async fillField(locator, value) {
        if (value !== undefined) {
            await this.page.fill(locator, value);
        }
    }

    async fillForm({ login, firstName, lastName, password, confirmPassword }) {
        await this.fillField(loginField, login);
        await this.fillField(firstNameField, firstName);
        await this.fillField(lastNameField, lastName);
        await this.fillField(passwordField, password);
        await this.fillField(confirmPasswordField, confirmPassword);
    }

    async clickRegisterButton() {
        await this.page.click(registerButton);
    }

    async isRegisterButtonDisabled() {
        return this.page.isDisabled(registerButton); 
    }    

    async getPasswordMismatchError() {
        return this.page.textContent(errorMessageForPasswords);
    }
}

export { RegisterPage };

