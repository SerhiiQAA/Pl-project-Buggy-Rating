// import { Page, Locator, expect } from '@playwright/test';

// class MainPage {
//     private page: Page;

//     // Локатори, які можуть змінюватися
//     private loginInputSelector: string = 'input[name="login"]';
//     private passwordInputSelector: string = 'input[name="password"]';
//     private loginButtonSelector: string = '.btn-success';
//     private registerButtonSelector: string = '.btn-success-outline';
//     private firstAvtoCardSelector: string = '.img-fluid.center-block:nth-of-type(1)';
//     private secondAvtoCardSelector: string = '.img-fluid.center-block:nth-of-type(2)';
//     private thirdAvtoCardSelector: string = '.img-fluid.center-block:nth-of-type(3)';
//     private firstAvtoCardTitleSelector: string = 'h2:nth-of-type(1)';
//     private secondAvtoCardTitleSelector: string = 'h2:nth-of-type(2)';
//     private thirdAvtoCardTitleSelector: string = 'h2:nth-of-type(3)';
//     private facebookSocialMediaButtonSelector: string = '[title="Facebook"]';
//     private xSocialMediaButtonSelector: string = '[title="Twitter"]';
//     private warningLabelSelector: string = '.label-warning';
//     private logoSelector: string = '.navbar-brand';
//     private logoutButtonSelector: string = 'li.nav-item:nth-child(3) > a:nth-child(1)';
//     private hiMessageAccountSelector: string = '.nav-item:nth-of-type(1)';

//     constructor(page: Page) {
//         this.page = page;
//     }

//     get loginInput(): Locator {
//         return this.page.locator(this.loginInputSelector);
//     }

//     get passwordInput(): Locator {
//         return this.page.locator(this.passwordInputSelector);
//     }

//     get loginButton(): Locator {
//         return this.page.locator(this.loginButtonSelector);
//     }

//     get registerButton(): Locator {
//         return this.page.locator(this.registerButtonSelector);
//     }

//     get firstAvtoCard(): Locator {
//         return this.page.locator(this.firstAvtoCardSelector);
//     }

//     get secondAvtoCard(): Locator {
//         return this.page.locator(this.secondAvtoCardSelector);
//     }

//     get thirdAvtoCard(): Locator {
//         return this.page.locator(this.thirdAvtoCardSelector);
//     }

//     get firstAvtoCardTitle(): Locator {
//         return this.page.locator(this.firstAvtoCardTitleSelector);
//     }

//     get secondAvtoCardTitle(): Locator {
//         return this.page.locator(this.secondAvtoCardTitleSelector);
//     }

//     get thirdAvtoCardTitle(): Locator {
//         return this.page.locator(this.thirdAvtoCardTitleSelector);
//     }

//     get facebookSocialMediaButton(): Locator {
//         return this.page.locator(this.facebookSocialMediaButtonSelector);
//     }

//     get xSocialMediaButton(): Locator {
//         return this.page.locator(this.xSocialMediaButtonSelector);
//     }

//     get warningLabel(): Locator {
//         return this.page.locator(this.warningLabelSelector);
//     }

//     get logo(): Locator {
//         return this.page.locator(this.logoSelector);
//     }

//     get logoutButton(): Locator {
//         return this.page.locator(this.logoutButtonSelector);
//     }

//     get hiMessageAccount(): Locator {
//         return this.page.locator(this.hiMessageAccountSelector);
//     }

//     async goto() {
//         await this.page.goto('/');
//     }

//     async checkTitle() {
//         await expect(this.page).toHaveTitle("Buggy Cars Rating");
//     }

//     async clickLogo() {
//         await this.logo.click();
//     }

//     async checkPlaceholder() {
//         const placeholder = await this.loginInput.getAttribute('placeholder');
//         expect(placeholder).toBe('Login');
//     }

//     async fillLoginDetails(username: string, password: string) {
//         await this.loginInput.fill(username);
//         await this.passwordInput.fill(password);
//     }

//     async clickLoginButton() {
//         await this.loginButton.click();
//     }

//     async clickRegisterButton() {
//         await this.registerButton.click();
//     }

//     async checkWarningLabel() {
//         await this.page.waitForSelector(this.warningLabelSelector, { state: 'visible' });
//         const warningText = await this.warningLabel.textContent();
//         expect(warningText?.trim()).toBe('Invalid username/password');
//     }

//     async errorMessageLogin() {
//         const loginMessage = await this.loginInput.evaluate(input => (input as HTMLInputElement).validationMessage);
//         expect(loginMessage.toLowerCase()).toContain("fill out this field");
//     }

//     async errorMessagePassword() {
//         const passwordMessage = await this.passwordInput.evaluate(input => (input as HTMLInputElement).validationMessage);
//         expect(passwordMessage.toLowerCase()).toContain("fill out this field");
//     }

//     async takeScreenshot(path: string) {
//         await this.page.screenshot({ path });
//     }

//     async getFirstAvtoCardTitle() {
//         return await this.firstAvtoCardTitle.textContent();
//     }

//     async getSecondAvtoCardTitle() {
//         return await this.secondAvtoCardTitle.textContent();
//     }

//     async getThirdAvtoCardTitle() {
//         return await this.thirdAvtoCardTitle.textContent();
//     }

//     async clickFirstAvtoCard() {
//         await this.firstAvtoCard.click();
//     }

//     async clickSecondAvtoCard() {
//         await this.secondAvtoCard.click();
//     }

//     async clickThirdAvtoCard() {
//         await this.thirdAvtoCard.click();
//     }

//     async mainPageTitle(selector: string) {
//         return await this.page.locator(selector).textContent();
//     }

//     async checkHiMessageLogin() {
//         return await this.hiMessageAccount.textContent();
//     }

//     async clickLogoutButton() {
//         await this.logoutButton.click();
//     }

//     async clickFacebookButton() {
//         await this.facebookSocialMediaButton.click();
//     }

//     async clickXButton() {
//         await this.xSocialMediaButton.click();
//     }
// }

// export { MainPage };



import { Page, Locator } from '@playwright/test';

class MainPage {
    private page: Page;

    // Локатори, які можуть змінюватися
    private loginInputSelector: string = 'input[name="login"]';
    private passwordInputSelector: string = 'input[name="password"]';
    private loginButtonSelector: string = '.btn-success';
    private registerButtonSelector: string = '.btn-success-outline';
    private firstAvtoCardSelector: string = '.img-fluid.center-block:nth-of-type(1)';
    private secondAvtoCardSelector: string = '.img-fluid.center-block:nth-of-type(2)';
    private thirdAvtoCardSelector: string = '.img-fluid.center-block:nth-of-type(3)';
    private warningLabelSelector: string = '.label-warning';
    private logoSelector: string = '.navbar-brand';
    private hiMessageAccountSelector: string = '.nav-item:nth-of-type(1)';
    private logoutButtonSelector: string = '(//a[@class="nav-link"])[2]';

    constructor(page: Page) {
        this.page = page;
    }

    get loginInput(): Locator {
        return this.page.locator(this.loginInputSelector);
    }

    get passwordInput(): Locator {
        return this.page.locator(this.passwordInputSelector);
    }

    get loginButton(): Locator {
        return this.page.locator(this.loginButtonSelector);
    }

    get warningLabel(): Locator {
        return this.page.locator(this.warningLabelSelector);
    }

    get logo(): Locator {
        return this.page.locator(this.logoSelector);
    }

    get hiMessageAccount(): Locator {
        return this.page.locator(this.hiMessageAccountSelector);
    }

    getLogoutButtonLocator(): Locator {
        return this.page.locator(this.logoutButtonSelector);
    }

    async goto() {
        await this.page.goto('/');
    }

    async fillLoginDetails(username: string, password: string) {
        await this.loginInput.fill(username);
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async clickLogoutButton() {
        await this.logoutButton.click();
    }

    async clickLogo() {
        await this.logo.click();
    }

    async getWarningLabelText(): Promise<string | null> {
        return await this.warningLabel.textContent();
    }

    async getLoginFieldValidationMessage(): Promise<string> {
        return await this.loginInput.evaluate(input => (input as HTMLInputElement).validationMessage);
    }

    async getPasswordFieldValidationMessage(): Promise<string> {
        return await this.passwordInput.evaluate(input => (input as HTMLInputElement).validationMessage);
    }
}

export { MainPage };
