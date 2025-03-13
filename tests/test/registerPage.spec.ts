import { test, expect } from '@playwright/test';
import { RegisterPage } from '../page/RegisterPage';
import { faker } from '@faker-js/faker';

test.describe('Registration Page Validation', () => {
    let registerPage: RegisterPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        await registerPage.goto();
    });

    test('Registration with valid data / TC 6', async () => {
        const validLogin = faker.string.alphanumeric(8);
        const validFirstName = faker.person.firstName();
        const validLastName = faker.person.lastName();
        const validPassword = faker.internet.password({ length: 8, memorable: false, pattern: /[a-zA-Z0-9!@#$%^&*()]/ })+ '1!Serg';

        await registerPage.fillForm({
            login: validLogin,
            firstName: validFirstName,
            lastName: validLastName,
            password: validPassword,
            confirmPassword: validPassword,
        });

        await registerPage.clickRegisterButton();

        await expect(registerPage.successMessage).toHaveText(/Registration is successful/i);
    });

    test('Registration with invalid Login / TC 7', async () => {
        const validFirstName = faker.person.firstName();
        const validLastName = faker.person.lastName();
        const validPassword = faker.internet.password({ length: 8, memorable: false, pattern: /[a-zA-Z0-9!@#$%^&*()]/ })+ '1!Serg';

        await registerPage.fillForm({
            firstName: validFirstName,
            lastName: validLastName,
            password: validPassword,
            confirmPassword: validPassword,
        });

        await expect(registerPage.registerButton).toBeDisabled();
    });

    test('Registration with invalid First Name / TC 8', async () => {
        const validLogin = faker.string.alphanumeric(8);
        const validLastName = faker.person.lastName();
        const validPassword = faker.internet.password({ length: 8, memorable: false, pattern: /[a-zA-Z0-9!@#$%^&*()]/ })+ '1!Serg';

        await registerPage.fillForm({
            login: validLogin,
            lastName: validLastName,
            password: validPassword,
            confirmPassword: validPassword,
        });

        await expect(registerPage.registerButton).toBeDisabled();
    });

    test('Registration with invalid Last Name / TC 9', async () => {
        const validLogin = faker.string.alphanumeric(8);
        const validFirstName = faker.person.firstName();
        const validPassword = faker.internet.password({ length: 8, memorable: false, pattern: /[a-zA-Z0-9!@#$%^&*()]/ })+ '1!Serg';

        await registerPage.fillForm({
            login: validLogin,
            firstName: validFirstName,
            password: validPassword,
            confirmPassword: validPassword,
        });

        await expect(registerPage.registerButton).toBeDisabled();
    });

    test('Registration when passwords do not match / TC 10', async () => {
        const validLogin = faker.string.alphanumeric(8);
        const validFirstName = faker.person.firstName();
        const validLastName = faker.person.lastName();
        const validPassword = faker.internet.password({ length: 8, memorable: false, pattern: /[a-zA-Z0-9!@#$%^&*()]/ })+ '1!Serg';
        const invalidConfirmPassword = faker.internet.password({ length: 4, memorable: false, pattern: /[a-zA-Z0-9!@#$%^&*()]/ })+ '1!Serg';

        await registerPage.fillForm({
            login: validLogin,
            firstName: validFirstName,
            lastName: validLastName,
            password: validPassword,
            confirmPassword: invalidConfirmPassword,
        });

        await expect(registerPage.registerButton).toBeDisabled();
        await expect(registerPage.getPasswordMismatchError()).resolves.toContain('Passwords do not match');
    });

    test('Registration with empty fields / TC 11', async () => {
        await registerPage.fillForm({});

        await expect(registerPage.registerButton).toBeDisabled();
    });
});
