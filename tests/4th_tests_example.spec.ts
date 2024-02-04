import { test, expect } from '@playwright/test';
import { MainPage } from '../page-objects/main_page';
import { title } from 'process';
import { Url } from 'url';
import { CheckoutPage } from '../page-objects/checkout_page';

test.describe("Check subscription banner", () => {
    test.beforeEach(async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.goto();
        await mainPage.searchLink.first().click();
    })
    test('Banner is displayed after 20 second', async ({ page }) => {
        const mainPage = new MainPage(page);
        await page.waitForTimeout(10000);

        await expect(mainPage.bannerTitle).toBeVisible();
    });
    test('Check subscribing for notification via banner', async ({ page }) => {
        const mainPage = new MainPage(page);
        await page.waitForTimeout(10000);
        await mainPage.fillOutUsername.fill("user");
        await mainPage.fillOutEmail.fill("email@test.com");
        await mainPage.subscribeButton.click();

        await mainPage.searchField.fill('Vitamin D3');
        await expect(mainPage.bannerTitle).toBeHidden;
    });
    test('Check closing banner', async ({ page }) => {
        const mainPage = new MainPage(page);
        await page.waitForTimeout(10000);
        await page.getByRole('button', { name: 'Close button' }).click();
        await mainPage.searchField.fill('Vitamin D3');

        await expect(mainPage.bannerTitle).toBeHidden;
    });
});