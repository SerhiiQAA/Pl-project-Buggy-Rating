import { test, expect } from '@playwright/test';
import { RegisterPage } from '../page/RegisterPage';
import { faker } from '@faker-js/faker';

test.describe('Registration Page Validation', () => {
    let registerPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        await registerPage.goto();
    });

    test('should register successfully with valid data', async () => {
        const validLogin = faker.string.alphanumeric(8);
        const validFirstName = faker.person.firstName();
        const validLastName = faker.person.lastName();
        const validPassword = faker.internet.password({ length: 12, memorable: false });
        
        await registerPage.fillForm({
            login: validLogin,
            firstName: validFirstName,
            lastName: validLastName,
            password: validPassword,
            confirmPassword: validPassword
        });
        await registerPage.clickRegisterButton();
    });

    test('should disable register button when all fields are empty', async () => {
        await registerPage.fillForm({}); 
        expect(await registerPage.isRegisterButtonDisabled()).toBeTruthy(); 
    });
    
    test('should show error when login is missing', async () => {
        const validFirstName = faker.person.firstName();
        const validLastName = faker.person.lastName();
        const validPassword = faker.internet.password({ length: 10, memorable: false });
        
        await registerPage.fillForm({
            firstName: validFirstName,
            lastName: validLastName,
            password: validPassword,
            confirmPassword: validPassword
        });
        expect(await registerPage.isRegisterButtonDisabled()).toBeTruthy();
    });
    
    test('should show error when first name is missing', async () => {
        const validLogin = faker.string.alphanumeric(8);
        const validLastName = faker.person.lastName();
        const validPassword = faker.internet.password({ length: 10, memorable: false });
        
        await registerPage.fillForm({
            login: validLogin,
            lastName: validLastName,
            password: validPassword,
            confirmPassword: validPassword
        });
        expect(await registerPage.isRegisterButtonDisabled()).toBeTruthy();
    });
    
    test('should show error when last name is missing', async () => {
        const validLogin = faker.string.alphanumeric(8);
        const validFirstName = faker.person.firstName();
        const validPassword = faker.internet.password({ length: 10, memorable: false });
        
        await registerPage.fillForm({
            login: validLogin,
            firstName: validFirstName,
            password: validPassword,
            confirmPassword: validPassword
        });
        expect(await registerPage.isRegisterButtonDisabled()).toBeTruthy();
    });
    
    test('should show error when passwords do not match', async () => {
        const validLogin = faker.string.alphanumeric(8);
        const validFirstName = faker.person.firstName();
        const validLastName = faker.person.lastName();
        const validPassword = faker.internet.password({ length: 10, memorable: false });
        const invalidConfirmPassword = faker.internet.password({ length: 10, memorable: false });

        await registerPage.fillForm({
            login: validLogin,
            firstName: validFirstName,
            lastName: validLastName,
            password: validPassword,
            confirmPassword: invalidConfirmPassword
        });
        const errorMessage = await registerPage.getPasswordMismatchError();
        expect(errorMessage).toContain('Passwords do not match');
    });
});
