import { test, expect } from '@playwright/test';
import { MainPage } from '../page/MainPage.ts';
import { 
    getLastRegisteredUser, 
    generateAndStoreValidLogin, 
    generateAndStoreValidPassword 
} from '../../utils/dataGenerators';

test.describe('Login Validation', () => {
    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page); 
        await mainPage.goto(); 
    });

    test('Login with valid data / TC 1', async () => {
        const validUser = getLastRegisteredUser();
        if (!validUser) {
            throw new Error('No registered user found. Ensure registration test has run successfully.');
        }
    
        await mainPage.fillLoginDetails(validUser.login, validUser.password);
        await mainPage.clickLoginButton();
    
        await expect(mainPage.getLogoutButtonLocator()).toBeVisible();
    });
    
    test('Login with empty Login field / TC 2', async () => {       
        await mainPage.fillLoginDetails('', generateAndStoreValidPassword());
        await mainPage.clickLoginButton();

        await expect(mainPage.getLoginFieldValidationMessage()).resolves.toMatch(/fill out this field/i);
    });

    test('Login with empty Password field / TC 3', async () => {       
        await mainPage.fillLoginDetails(generateAndStoreValidLogin(), '');
        await mainPage.clickLoginButton();

        await expect(mainPage.getPasswordFieldValidationMessage()).resolves.toMatch(/fill out this field/i);
    });

    test('Login with empty fields / TC 4', async () => {       
        await mainPage.fillLoginDetails('', '');
        await mainPage.clickLoginButton();

        await expect(mainPage.getLoginFieldValidationMessage()).resolves.toMatch(/fill out this field/i);
    });

    test('Login with invalid data / TC 5', async () => {
        await mainPage.fillLoginDetails(generateAndStoreValidLogin(), generateAndStoreValidPassword());
        await mainPage.clickLoginButton();

        await expect(mainPage.getWarningLabelText()).resolves.toMatch(/invalid username\/password/i);
    });
});
