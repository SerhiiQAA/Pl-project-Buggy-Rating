import { test, expect } from '@playwright/test';
import { RegisterPage } from '../page/RegisterPage';
import { faker } from '@faker-js/faker';

test.describe('Registration Page Validation', () => {
    let registerPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        await registerPage.goto();
    });

    test('Registretion with valid data / TC 6', async () => {
        const validLogin = faker.string.alphanumeric(8);
        const validFirstName = faker.person.firstName();
        const validLastName = faker.person.lastName();
        const validPassword = faker.internet.password({ length: 4, memorable: false, pattern: /[a-zA-Z0-9]/ });
        
        await registerPage.fillForm({
            login: validLogin,
            firstName: validFirstName,
            lastName: validLastName,
            password: validPassword,
            confirmPassword: validPassword
        });
        await registerPage.clickRegisterButton();

    });
    
    test('Registretion with invalid Login / TC 7', async () => {
        const validFirstName = faker.person.firstName();
        const validLastName = faker.person.lastName();
        const validPassword = faker.internet.password({ length: 4, memorable: false, pattern: /[a-zA-Z0-9]/ });
        
        await registerPage.fillForm({
            firstName: validFirstName,
            lastName: validLastName,
            password: validPassword,
            confirmPassword: validPassword
        });
        expect(await registerPage.isRegisterButtonDisabled()).toBeTruthy();
    });
    
    test('Registretion with invalid First Name / TC 8', async () => {
        const validLogin = faker.string.alphanumeric(8);
        const validLastName = faker.person.lastName();
        const validPassword = faker.internet.password({ length: 4, memorable: false, pattern: /[a-zA-Z0-9]/ });
        
        await registerPage.fillForm({
            login: validLogin,
            lastName: validLastName,
            password: validPassword,
            confirmPassword: validPassword
        });
        expect(await registerPage.isRegisterButtonDisabled()).toBeTruthy();
    });
    
    test('Registretion with invalid Last Name / TC 9', async () => {
        const validLogin = faker.string.alphanumeric(8);
        const validFirstName = faker.person.firstName();
        const validPassword = faker.internet.password({ length: 4, memorable: false, pattern: /[a-zA-Z0-9]/ });
        
        await registerPage.fillForm({
            login: validLogin,
            firstName: validFirstName,
            password: validPassword,
            confirmPassword: validPassword
        });
        expect(await registerPage.isRegisterButtonDisabled()).toBeTruthy();
    });
    
    test('Registration when passwords do not match / TC 10', async () => {
        const validLogin = faker.string.alphanumeric(8);
        const validFirstName = faker.person.firstName();
        const validLastName = faker.person.lastName();
        const validPassword = faker.internet.password({ length: 4, memorable: false, pattern: /[a-zA-Z0-9]/ });
        const invalidConfirmPassword = faker.internet.password({ length: 4, memorable: false, pattern: /[a-zA-Z0-9]/ });

        await registerPage.fillForm({
            login: validLogin,
            firstName: validFirstName,
            lastName: validLastName,
            password: validPassword,
            confirmPassword: invalidConfirmPassword
        });
        expect(await registerPage.isRegisterButtonDisabled()).toBeTruthy();

        const errorMessage = await registerPage.getPasswordMismatchError();
        expect(errorMessage).toContain('Passwords do not match');
    });

    test('Registration with empty fields / TC 11', async () => {
        await registerPage.fillForm({}); 
        expect(await registerPage.isRegisterButtonDisabled()).toBeTruthy(); 
    });
});
