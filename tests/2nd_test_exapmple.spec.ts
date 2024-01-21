import { test, expect } from '@playwright/test';
import { MainPage } from '../page-objects/main_page';
import { title } from 'process';
import { Url } from 'url';

test.describe("PerlaHelsa shop test", () => {
  test('Check Main Page Content', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.goto();

    await expect(page).toHaveTitle('Home page'); // Expect a title "to contain" a substring.
    await expect(page.getByRole('link', { name: '-15% ON BUNDLE FOR THE BEAUTY' }).nth(1)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Allow' })).toBeVisible();
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.locator(mainPage.banner_to_be_visible)).toBeVisible();
  });
  test('Search PopUp window', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.goto();
    await mainPage.searchLink.first().click();

    await expect(page.locator('.open-menu__content')).toBeVisible();
    await expect(page.getByText("Popular products")).toBeVisible();
    mainPage.massive_of_tags.forEach(async element => {
      await expect(page.locator('div').filter({ hasText: element })).toBeVisible();
    });
    await expect(page.locator('.recommended-product__coverLink').first()).toBeVisible();
    await expect(mainPage.searchField).toBeEditable();
  });
  test.describe("search suit", async () => {
    test("1st Test Search Result is shown", async ({ page }) => {
      const mainPage = new MainPage(page);
      await mainPage.goto();
      await mainPage.searchLink.first().click();
      await mainPage.searchField.fill('Vitamin D3');
      await mainPage.search_result_locator.first().click(); // how to click button on banner

      await expect(page).toHaveURL(mainPage.testURL + "/vitamin-d3-2000");
    })
    test("2nd Test Search Result is shown", async ({ page }) => {
      const mainPage = new MainPage(page);
      await mainPage.goto();
      await mainPage.searchLink.first().click();
      await mainPage.searchField.fill('K2');
      await mainPage.search_result_locator.first().click(); // how to click button on banner

      await expect(page).toHaveURL(mainPage.testURL + "/vitamin-d3-k2-match");
    })
    test("3rd Test Search Result is shown", async ({ page }) => {
      const mainPage = new MainPage(page);
      await mainPage.goto();
      await mainPage.searchLink.first().click();
      await mainPage.searchField.fill('Bundle');
      await mainPage.search_result_locator.first().click(); // how to click button on banner

      await expect(page).toHaveURL(mainPage.testURL + "/kompleks-dlya-krasoty-volos-i-kozhi");
    })
  })
  test("Check Main Category Page", async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.goto();
    await page.getByRole('navigation').getByRole('link', { name: 'Collagen' }).click();

    await expect(page).toHaveURL(mainPage.testURL + "/collagen");
    await expect(page).toHaveTitle('Collagen: buy collagen in Ukraine and Kyiv - PERLA HELSA');
    await expect(page.getByText('One of the secrets that will')).toBeVisible();
  })
  test.describe("login suit", async () => {
    test("Happy pass to Login with Phone Num", async ({ page }) => {
      const mainPage = new MainPage(page);
      await mainPage.goto();
      await mainPage.toLogInLink.click();
      await mainPage.loginField.fill('380503034829');
      await mainPage.passwordField.fill('qwerty!A1');
      await page.getByText('Remember me').click();
      await page.getByRole('button', { name: 'Log in', exact: true }).click();

      await expect(page).toHaveURL(mainPage.testURL + "/personal-account/orders");
      await expect(page.getByText("alina y")).toBeVisible();
    })
    test("Failed to Login with Phone Num due to not exist account", async ({ page }) => {
      const mainPage = new MainPage(page);
      await mainPage.goto();
      await mainPage.toLogInLink.click();
      await mainPage.loginField.fill('test@email.com');
      await mainPage.passwordField.fill('qwerty!A1');
      await page.getByText('Remember me').click();
      await page.getByRole('button', { name: 'Log in', exact: true }).click();

      await expect(page).toHaveURL(mainPage.testURL + "?target=/en/personal-account/orders");
    })
    test("Failed to Login with Phone Num due to wrond pass", async ({ page }) => {
      const mainPage = new MainPage(page);
      await mainPage.goto(); 
      await mainPage.toLogInLink.click();
      await mainPage.loginField.fill('380503034829');
      await mainPage.passwordField.fill('wrong_password!Q#');
      await page.getByText('Remember me').click();
      await page.getByText('Log inCreate an account').click();

      await expect(page).toHaveURL(mainPage.testURL + "?target=/en/personal-account/orders");
    })
  })
});

