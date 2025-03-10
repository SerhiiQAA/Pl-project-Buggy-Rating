import { test, expect } from '@playwright/test';
import assert from 'assert';
import { MainPage } from '../page/MainPage.ts';

test('validate both login and password filled', async ({ page }) => {
    const mainPage = new MainPage(page);

    await mainPage.goto();
    await mainPage.fillLoginDetails('TestLogin_', 'Password1@');
    await mainPage.clickLoginButton();
    await mainPage.clicklogoutButton();
});

test('has title', async ({ page }) => {
    const mainPage = new MainPage(page);

    await mainPage.goto();
    await mainPage.fillLoginDetails('', '');
    await mainPage.clickLoginButton();
    await mainPage.checkValidationMessages();
});

test('validate empty login and password fields', async ({ page }) => {
    const mainPage = new MainPage(page);

    await mainPage.goto();
    await mainPage.fillLoginDetails('', '');
    await mainPage.clickLoginButton();
    await mainPage.checkValidationMessages();
});

// test('validate only login filled', async ({ page }) => {
//     const mainPage = new MainPage(page);

//     await mainPage.goto();
//     await mainPage.fillLoginDetails('validLogin', '');
//     await mainPage.clickLoginButton();
//     await mainPage.checkValidationMessages();
// });

// test('validate only password filled', async ({ page }) => {
//     const mainPage = new MainPage(page);

//     await mainPage.goto();
//     await mainPage.fillLoginDetails('', 'validPassword');
//     await mainPage.clickLoginButton();
//     await mainPage.checkValidationMessages();
// });


