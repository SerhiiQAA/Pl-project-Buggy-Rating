import { test, expect } from '@playwright/test';
import { MainPage } from '../page/MainPage.ts';
import { faker } from '@faker-js/faker'; 

test.describe('Login Page Validation', () => {
    let mainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page); 
        await mainPage.goto(); 
    });

    test('Login with valid login and password fields', async () => {
        await mainPage.fillLoginDetails('TestLogin_', 'Password1@');
        await mainPage.clickLoginButton();
        await mainPage.clickLogoutButton();
    });

    test('Login with invalid login and password fields', async () => {
        const invalidLogin = faker.string.alphanumeric(8); 
        const invalidPassword = faker.internet.password({ length: 4, memorable: false, pattern: /[a-zA-Z0-9]/ });

        await mainPage.fillLoginDetails(invalidLogin, invalidPassword);
        await mainPage.clickLoginButton();
        await mainPage.checkWarningLabel();
    });

    test('Login with empty login and password fields', async () => {
        await mainPage.fillLoginDetails('', ''); 
        await mainPage.clickLoginButton();
        await mainPage.errorMessageLogin();
    });

    test('Login with only valid login field', async () => {
        const validLogin = faker.string.alphanumeric(8); 
        await mainPage.fillLoginDetails(validLogin, ''); 
        await mainPage.clickLoginButton();
        await mainPage.errorMessagePassword();
    });

    test('Login with only valid password field', async () => {
        const validPassword = faker.internet.password({ length: 4, memorable: false, pattern: /[a-zA-Z0-9]/ });
         
        await mainPage.fillLoginDetails('', validPassword); 
        await mainPage.clickLoginButton();
        await mainPage.errorMessageLogin();
    });
});
