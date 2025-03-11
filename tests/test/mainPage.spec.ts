import { test, expect } from '@playwright/test';
import { MainPage } from '../page/MainPage.ts';
import { faker } from '@faker-js/faker'; 

test.describe('Login Page Validation', () => {
    let mainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page); 
        await mainPage.goto(); 
    });

    test('validate with valid login and password fields', async () => {
        await mainPage.fillLoginDetails('TestLogin_', 'Password1@');
        await mainPage.clickLoginButton();
        await mainPage.clickLogoutButton();
    });

    test('validate with invalid login and password fields', async () => {
        const invalidLogin = faker.string.alphanumeric(8); 
        const invalidPassword = faker.internet.password({ length: 4, memorable: false });

        await mainPage.fillLoginDetails(invalidLogin, invalidPassword);
        await mainPage.clickLoginButton();
        await mainPage.checkWarningLabel();
    });

    test('validate with empty login and password fields', async () => {
        await mainPage.fillLoginDetails('', ''); 
        await mainPage.clickLoginButton();
        await mainPage.errorMessageLogin();
    });

    test('validate with only valid login field', async () => {
        const validLogin = faker.string.alphanumeric(8); 
        await mainPage.fillLoginDetails(validLogin, ''); 
        await mainPage.clickLoginButton();
        await mainPage.errorMessagePassword();
    });

    test('validate with only valid password field', async () => {
        const validPassword = faker.internet.password({
            length: 8,
            memorable: false,
            pattern: /[a-zA-Z0-9]/ 
        });
         
        await mainPage.fillLoginDetails('', validPassword); 
        await mainPage.clickLoginButton();
        await mainPage.errorMessageLogin();
    });
});
