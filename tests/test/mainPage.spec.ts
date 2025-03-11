import { test, expect } from '@playwright/test';
import { MainPage } from '../page/MainPage.ts';

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
        await mainPage.fillLoginDetails('Error', 'error');
        await mainPage.clickLoginButton();
        await mainPage.checkWarningLabel();
    });

    test('validate with empty login and password fields', async () => {
        await mainPage.fillLoginDetails('', '');
        await mainPage.clickLoginButton();
        await mainPage.errorMessageLogin();
    });

    test('validate with only valid login field', async () => {
        await mainPage.fillLoginDetails('TestLogin_', '');
        await mainPage.clickLoginButton();
        await mainPage.errorMessagePassword();
    });

    test('validate with only valid password field', async () => {
        await mainPage.fillLoginDetails('', 'Password1@');
        await mainPage.clickLoginButton();
        await mainPage.errorMessageLogin();
    });
});
