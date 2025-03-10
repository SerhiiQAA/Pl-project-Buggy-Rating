import { test, expect } from '@playwright/test';
import assert from 'assert';
import { MainPage } from '../page/MainPage.ts';

test('has title', async ({ page }) => {
    const mainPage = new MainPage(page);

    await mainPage.goto();
    await mainPage.checkTitle();
    await mainPage.checkPlaceholder();
    // await mainPage.fillLoginDetails('', '');
    await mainPage.clickLoginButton();
    await mainPage.checkValidationMessagesLogin();
    await mainPage.takeScreenshot('screenshot_after_action.png');

});