import { test, expect } from '@playwright/test';
import { RegisterPage } from '../page/RegisterPage';
import { 
    generateAndStoreValidLogin, 
    generateAndStoreValidPassword, 
    generateValidFirstName, 
    generateValidLastName, 
    saveLastRegisteredUser, 
} from '../../utils/dataGenerators';

test.describe('Registration Page Validation', () => {
    let registerPage: RegisterPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        await registerPage.goto();
    });

    test('Registration with valid data / TC 6', async () => {
        const validLogin = generateAndStoreValidLogin();
        const validPassword = generateAndStoreValidPassword();
        const validFirstName = generateValidFirstName();
        const validLastName = generateValidLastName();
    
        await registerPage.fillForm({
            login: validLogin,
            firstName: validFirstName,
            lastName: validLastName,
            password: validPassword,
            confirmPassword: validPassword,
        });
    
        await registerPage.clickRegisterButton();
        await expect(registerPage.successMessage).toHaveText(/Registration is successful/i);
    
        saveLastRegisteredUser({
            login: validLogin,
            password: validPassword,
            firstName: validFirstName,
            lastName: validLastName,
        });
    });
    

    test('Registration with invalid Login / TC 7', async () => {     
        await registerPage.fillForm({
            firstName: generateValidFirstName(),
            lastName: generateValidLastName(),
            password: generateAndStoreValidPassword(),
            confirmPassword: generateAndStoreValidPassword(),
        });

        await expect(registerPage.registerButton).toBeDisabled();
    });

    test('Registration with invalid First Name / TC 8', async () => {
        await registerPage.fillForm({
            login: generateAndStoreValidLogin(),
            lastName: generateValidLastName(),
            password: generateAndStoreValidPassword(),
            confirmPassword: generateAndStoreValidPassword(),
        });

        await expect(registerPage.registerButton).toBeDisabled();
    });

    test('Registration with invalid Last Name / TC 9', async () => {
        await registerPage.fillForm({
            login: generateAndStoreValidLogin(),
            firstName: generateValidFirstName(),
            password: generateAndStoreValidPassword(),
            confirmPassword: generateAndStoreValidPassword(),
        });

        await expect(registerPage.registerButton).toBeDisabled();
    });

    test('Registration when passwords do not match / TC 10', async () => {
        await registerPage.fillForm({
            login: generateAndStoreValidLogin(),
            firstName: generateValidFirstName(),
            lastName: generateValidLastName(),
            password: generateAndStoreValidPassword(),
            confirmPassword: generateAndStoreValidPassword(),
        });

        await expect(registerPage.registerButton).toBeDisabled();
        await expect(registerPage.getPasswordMismatchError()).resolves.toContain('Passwords do not match');
    });

    test('Registration with empty fields / TC 11', async () => {
        await registerPage.fillForm({});

        await expect(registerPage.registerButton).toBeDisabled();
    });
});
