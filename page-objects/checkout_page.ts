import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameField: Locator;
    readonly orderPanel: Locator;
    readonly productInBasket: Locator;
    readonly sumOfOrder: Locator;
    readonly sumToPay: Locator;
    readonly checkBox: Locator;
    readonly newCustomerLabel: Locator;
    readonly lastName: Locator;
    readonly cellPhoneField: Locator;
    readonly emailField: Locator;
    readonly checkoutButton: Locator;
    readonly check1stStep: Locator;
    readonly shippingMethodPanel: Locator;
    readonly allowCookiesButton: Locator;
    readonly shipCompanyDropDown: Locator;
    readonly shipCompanyUrkPost: Locator;
    readonly shipPostCompany: Locator;
    readonly shipPostal: Locator;
    readonly postDepartment: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameField = page.getByPlaceholder('Name *', { exact: true });
        this.lastName = page.getByPlaceholder('Surname *');
        this.orderPanel = page.getByText('Your order').nth(1);
        this.productInBasket = page.locator('span').filter({ hasText: 'Omega-3 Tuna' });
        this.sumOfOrder = page.locator('[id="__nuxt"]').getByText('798 ₴').nth(2);
        this.sumToPay = page.locator('[id="__nuxt"]').getByText('To pay798 ₴');
        this.checkBox = page.getByRole('checkbox');
        this.newCustomerLabel = page.getByRole('button', { name: 'New customer' });
        this.cellPhoneField = page.getByRole('textbox', { name: '+38(___)-___-__-__ *' });
        this.emailField = page.getByRole('textbox', { name: 'E-mail' });
        this.checkoutButton = page.getByRole('button', { name: 'More' });
        this.check1stStep = page.locator('rect').nth(1);
        this.shippingMethodPanel = page.getByText('Delivery method', { exact: true });
        this.allowCookiesButton = page.getByRole('button', { name: 'Allow' });
        this.shipCompanyDropDown = page.locator('p').filter({ hasText: 'Nova poshta' });
        this.shipCompanyUrkPost = page.locator('div').filter({ hasText: /^UkrPoshta$/ });
        this.shipPostal = page.getByPlaceholder('Postal office *');
        this.postDepartment = page.getByPlaceholder('Postcode *');
    }
}

