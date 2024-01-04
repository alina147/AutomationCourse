import { test, expect } from '@playwright/test';
import { title } from 'process';

test.beforeEach(async ({ page }) => {
  await page.goto('https://yavir-ua.com.ua/');
});

test.describe("Yavir shop test", () => {

  test('Check Main Page Content', async ({ page }) => {

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle('\"Чай, солодощі, подарунки ýavir\" - контакти, товари, послуги, ціни');
    await expect(page.getByPlaceholder('Пошук')).toBeVisible();
    await expect(page.getByText('Групи товарів та послуг')).toBeVisible();
    await expect(page.getByRole('article').getByText('про чай, солодощі, подарунки')).toBeVisible();
  });

  test('Check Product Category Page Content', async ({ page }) => {
    await page.getByRole('link', { name: 'Подарункові набори' }).first().click();

    await expect(page).toHaveTitle('Подарункові набори в Києві від компанії \"Чай, солодощі, подарунки ýavir\".');
    await expect(page).toHaveURL("https://yavir-ua.com.ua/g89759176-podarunkovi-nabori");
    await expect(page.getByText("Бокс чаю етнографічних регіонів України")).toBeVisible();
    // await expect(page.getByRole( ,('#product_items_per_page')})).toHaveValues();
  });


  test("Check single product page", async ({ page }) => {

    await page.goto('https://yavir-ua.com.ua/g89759175-chaj');
    await page.getByRole('link', { name: 'Чорний чай' }).first().click();

    await expect(page).toHaveTitle('Чорний чай в Києві від компанії \"Чай, солодощі, подарунки ýavir\".');
    await expect(page).toHaveURL("https://yavir-ua.com.ua/g100128457-chornij-chaj");

    await expect(page.getByPlaceholder('від')).toBeEditable();
    await expect(page.getByPlaceholder('до')).toBeEditable();
    await expect(page.locator('#product_price_order')).toBeVisible();
    await expect(page.locator('#product_items_per_page')).toHaveValue('48');


    await page.click('#product_items_per_page');
    // await page.waitForSelector('.menu-item'); - how to open drop down and choose new element 
    await page.getByRole('link', { name: 'Купити' }).first().click();
  })




});

