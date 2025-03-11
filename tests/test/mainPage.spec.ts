import { test, expect } from '@playwright/test';
import assert from 'assert';
import { MainPage } from '../page/MainPage.ts';

test('validate with valid login and password filled', async ({ page }) => {
    const mainPage = new MainPage(page);

    await mainPage.goto();
    await mainPage.fillLoginDetails('TestLogin_', 'Password1@');
    await mainPage.clickLoginButton();
    await mainPage.clicklogoutButton();
});

test('validate with invalid login and password fields', async ({ page }) => {
    const mainPage = new MainPage(page);

    await mainPage.goto();
    await mainPage.fillLoginDetails('Error', 'error');
    await mainPage.clickLoginButton();
    await mainPage.checkWarningLabel();
});

test('validate with empty login and password fields', async ({ page }) => {
    const mainPage = new MainPage(page);

    await mainPage.goto();
    await mainPage.fillLoginDetails('', '');
    await mainPage.clickLoginButton();
    await mainPage.errorMessageLogin();
});

test('validate with only valid login filled', async ({ page }) => {
    const mainPage = new MainPage(page);

    await mainPage.goto();
    await mainPage.fillLoginDetails('TestLogin_', '');
    await mainPage.clickLoginButton();
    await mainPage.errorMessagePassword();
});

test('validate with only valid password filled', async ({ page }) => {
    const mainPage = new MainPage(page);

    await mainPage.goto();
    await mainPage.fillLoginDetails('', 'Password1@');
    await mainPage.clickLoginButton();
    await mainPage.errorMessageLogin();
});


