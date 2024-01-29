import { test, expect } from '@playwright/test';
import { MainPage } from '../page-objects/main_page';
import { title } from 'process';
import { Url } from 'url';
import { CheckoutPage } from '../page-objects/checkout_page';

test.describe("Add Product to List", () => {
    test.beforeEach(async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.goto();
        await mainPage.searchLink.first().click();
        await mainPage.searchField.fill('Omega');
        await mainPage.productToList.first().click()
    });
    test('Add product to list/ check chechout pop-up', async ({ page }) => {

        await expect(page.getByText('Basket')).toBeVisible();
        await expect(page.locator('p').filter({ hasText: /^Omega-3 Tuna$/ })).toBeVisible();
        await expect(page.locator('p').filter({ hasText: /^798 ₴$/ }).first()).toBeVisible();
        await expect(page.getByText('To pay')).toBeVisible();
        await expect(page.locator('span').filter({ hasText: /^Delivery$/ })).toBeVisible();
        await expect(page.getByText('from 50 ₴')).toBeVisible();
    })
    test('Add product to list/Checkout page', async ({ page }) => {
        const mainPage = new MainPage(page);
        const checkoutPage = new CheckoutPage(page);
        await mainPage.goToCheckout.click();

        await expect(page).toHaveURL(mainPage.testURL + "/cart/checkout");
        await expect(checkoutPage.orderPanel).toBeVisible();
        await expect(checkoutPage.productInBasket).toBeVisible();
        await expect(checkoutPage.sumOfOrder).toBeVisible();
        await expect(checkoutPage.sumToPay).toBeVisible();
        await expect(checkoutPage.checkBox).toBeChecked();
        await expect(checkoutPage.newCustomerLabel).toBeEnabled();
        await expect(checkoutPage.firstNameField).toBeEditable();
        await expect(checkoutPage.lastName).toBeEditable();
        await expect(checkoutPage.cellPhoneField).toBeEditable();
        await expect(checkoutPage.emailField).toBeEditable();
    })
    test('Add product to list/Fill out Checkout Form as New Client', async ({ page }) => {
        const mainPage = new MainPage(page);
        const checkoutPage = new CheckoutPage(page);
        await mainPage.goToCheckout.click();
        await checkoutPage.firstNameField.fill('Alina');
        await checkoutPage.lastName.fill('Yermolovich');
        await checkoutPage.cellPhoneField.fill('+38050302222222');
        await checkoutPage.emailField.fill('test@gmail.com')
        await checkoutPage.allowCookiesButton.click();
        await checkoutPage.checkoutButton.click();

        await expect(checkoutPage.check1stStep).toBeEnabled();
        await expect(checkoutPage.shippingMethodPanel).toBeInViewport();

        await checkoutPage.shipCompanyDropDown.click();
        await checkoutPage.shipCompanyUrkPost.click();
        await checkoutPage.postDepartment.fill('61177');
        await checkoutPage.shipPostal.click();
        await checkoutPage.checkoutButton.click();

        await expect(page.getByText('м. Харків ')).toBeVisible();
    })
})