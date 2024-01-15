import { test, expect } from '@playwright/test';
import { MainPage } from '../page-objects/main_page';
import { title } from 'process';
import { Url } from 'url';

let testURL = 'https://perlahelsa.ua/en';

let banner_to_be_visible = '//html/body/div[2]/div/div[1]/header/div[3]/nav/ul/li[4]/a[1]';
let massive_of_tags = [/^Skin and hair$/, /^Mood and sleep$/, /^Immunity$/, /^Vitality$/];

//test.beforeEach(async ({ page }) => {
//await page.goto(testURL);
//});

test.describe("PerlaHelsa shop test", () => {

  test('Check Main Page Content', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.goto();
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle('Home page');
    await expect(page.getByRole('link', { name: '-15% ON BUNDLE FOR THE BEAUTY' }).nth(1)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Allow' })).toBeVisible();
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.locator(banner_to_be_visible)).toBeVisible();
  });

  test('Search PopUp window', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.goto();
    await mainPage.searchLink.first().click();

    await expect(page.locator('.open-menu__content')).toBeVisible();
    await expect(page.getByText("Popular products")).toBeVisible();

    massive_of_tags.forEach(async element => {
      await expect(page.locator('div').filter({ hasText: element })).toBeVisible();
    });
    await expect(page.locator('.recommended-product__coverLink').first()).toBeVisible();
    await expect(page.getByPlaceholder('Search products')).toBeEditable();
  });


  test.describe("search suit", async () => {
    test("1st Test Search Result is shown", async ({ page }) => {
      const mainPage = new MainPage(page);
     await mainPage.goto();
     await mainPage.searchLink.first().click();
     
      await mainPage.searchField.fill('Vitamin D3');
      await mainPage.search_result_locator.first().click(); // how to click button on banner

      await expect(page).toHaveURL(testURL + "/vitamin-d3-2000");
    })

    test("2nd Test Search Result is shown", async ({ page }) => {
      const mainPage = new MainPage(page);
      await mainPage.goto();
      await mainPage.searchLink.first().click();
      await mainPage.searchField.fill('K2');
      await mainPage.search_result_locator.first().click(); // how to click button on banner

      await expect(page).toHaveURL(testURL + "/vitamin-d3-k2-match");
    })

    test("3rd Test Search Result is shown", async ({ page }) => {
      const mainPage = new MainPage(page);
      await mainPage.goto();
      await mainPage.searchLink.first().click();
      await mainPage.searchField.fill('Bundle');
      await mainPage.search_result_locator.first().click(); // how to click button on banner

      await expect(page).toHaveURL(testURL + "/kompleks-dlya-krasoty-volos-i-kozhi");
    })
  })

  test("Check Main Category Page", async ({ page }) => {

    await page.getByRole('navigation').getByRole('link', { name: 'Collagen' }).click();

    await expect(page).toHaveURL(testURL + "/collagen");
    await expect(page).toHaveTitle('Collagen: buy collagen in Ukraine and Kyiv - PERLA HELSA');
    await expect(page.getByText('One of the secrets that will')).toBeVisible();
  })

  test.describe("login suit", async () => {
    test("Happy pass to Login with Phone Num", async ({ page }) => {
      await page.getByText("My orders").click();
      await page.getByPlaceholder('E-mail or phone number').fill('380503034829');
      await page.getByPlaceholder('Password').fill('qwerty!A1');
      await page.getByText('Remember me').click();
      await page.getByRole('button', { name: 'Log in', exact: true }).click();

      await expect(page).toHaveURL(testURL + "/personal-account/orders");
      await expect(page.getByText("alina y")).toBeVisible();

    })

    test("Failed to Login with Phone Num due to not exist account", async ({ page }) => {
      await page.getByText("My orders").click();
      await page.getByPlaceholder('E-mail or phone number').fill('test@email.com');
      await page.getByPlaceholder('Password').fill('qwerty!A1');
      await page.getByText('Remember me').click();
      await page.getByRole('button', { name: 'Log in', exact: true }).click();

      await expect(page).toHaveURL(testURL + "?target=/en/personal-account/orders");

    })

    test("Failed to Login with Phone Num due to wrond pass", async ({ page }) => {
      await page.getByText("My orders").click();
      await page.getByPlaceholder('E-mail or phone number').fill('380503034829');
      await page.getByPlaceholder('Password').fill('wrong_password!Q#');
      await page.getByText('Remember me').click();
      await page.getByText('Log inCreate an account').click();

      await expect(page).toHaveURL(testURL + "?target=/en/personal-account/orders");

    })
  })

});

