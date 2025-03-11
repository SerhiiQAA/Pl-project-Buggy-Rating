import { test, expect } from '@playwright/test';
import { RegisterPage } from '../page/RegisterPage';

test.describe('Registration Page Validation', () => {
    let registerPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        await registerPage.goto();
    });

    test('should disable register button when all fields are empty', async () => {
        await registerPage.fillForm({}); // Не заповнюємо жодного поля
        expect(await registerPage.isRegisterButtonDisabled()).toBeTruthy(); // Перевіряємо, що кнопка неактивна
    });
    
    test('should show error when login is missing', async () => {
        await registerPage.fillForm({
            firstName: 'John',
            lastName: 'Doe',
            password: 'password123',
            confirmPassword: 'password123'
        });
        expect(await registerPage.isRegisterButtonDisabled()).toBeTruthy();
    });
    
    test('should show error when first name is missing', async () => {
        await registerPage.fillForm({
            login: 'johndoe',
            lastName: 'Doe',
            password: 'password123',
            confirmPassword: 'password123'
        });
        expect(await registerPage.isRegisterButtonDisabled()).toBeTruthy();
    });
    
    test('should show error when last name is missing', async () => {
        await registerPage.fillForm({
            login: 'johndoe',
            firstName: 'John',
            password: 'password123',
            confirmPassword: 'password123'
        });
        expect(await registerPage.isRegisterButtonDisabled()).toBeTruthy();
    });
    
    test('should show error when passwords do not match', async () => {
        await registerPage.fillForm({
            login: 'johndoe',
            firstName: 'John',
            lastName: 'Doe',
            password: 'password123',
            confirmPassword: 'wrongpassword'
        });
        expect(await registerPage.getErrorMessage(registerPage.errorMessageForPasswords))
            .toContain('Passwords do not match');
    });
    
    test('should register successfully with valid data', async () => {
        await registerPage.fillForm({
            login: 'johndoe',
            firstName: 'John',
            lastName: 'Doe',
            password: 'password123',
            confirmPassword: 'password123'
        });
        await registerPage.clickRegisterButton();

    });
});
