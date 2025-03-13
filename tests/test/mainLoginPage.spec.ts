import { test, expect } from '@playwright/test';
import { MainPage } from '../page/MainPage.ts';
import { faker } from '@faker-js/faker'; 

test.describe('Login Validation', () => {
    let mainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page); 
        await mainPage.goto(); 
    });

    test('Login with valid data / TC 1', async () => {
        await mainPage.fillLoginDetails('TestLogin_', 'Password1@');
        await mainPage.clickLoginButton();
        await mainPage.clickLogoutButton();
    });

    test('Login with empty Login field / TC 2', async () => {
        const validPassword = faker.internet.password({ length: 4, memorable: false, pattern: /[a-zA-Z0-9]/ });
         
        await mainPage.fillLoginDetails('', validPassword); 
        await mainPage.clickLoginButton();
        await mainPage.errorMessageLogin();
    });

    test('Login with empty Password field / TC 3', async () => {
        const validLogin = faker.string.alphanumeric(8); 
        await mainPage.fillLoginDetails(validLogin, ''); 
        await mainPage.clickLoginButton();
        await mainPage.errorMessagePassword();
    });

    test('Login with empty fields / TC 4', async () => {
        await mainPage.fillLoginDetails('', ''); 
        await mainPage.clickLoginButton();
        await mainPage.errorMessageLogin();
    });

    test('Login with invalid data / TC 5', async () => {
        const invalidLogin = faker.string.alphanumeric(8); 
        const invalidPassword = faker.internet.password({ length: 4, memorable: false, pattern: /[a-zA-Z0-9]/ });

        await mainPage.fillLoginDetails(invalidLogin, invalidPassword);
        await mainPage.clickLoginButton();
        await mainPage.checkWarningLabel();
    });
});
