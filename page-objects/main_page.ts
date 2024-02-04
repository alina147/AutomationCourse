import { expect, type Locator, type Page } from '@playwright/test';

export class MainPage {
    readonly page: Page;
    readonly searchLink: Locator;
    readonly logInButton: Locator;
    readonly searchField: Locator;
    readonly loginField: Locator;
    readonly passwordField: Locator;
    readonly search_result_locator: Locator;
    readonly testURL: String;
    readonly banner_to_be_visible;
    readonly massive_of_tags;
    readonly toLogInLink: Locator;
    readonly mainHeader: Locator;
    readonly productToList: Locator;
    readonly goToCheckout: Locator;
    readonly fillOutEmail: Locator;
    readonly subscribeButton: Locator;
    readonly fillOutUsername: Locator;
    readonly bannerTitle: Locator;
    constructor(page: Page) {
        this.page = page;
        this.searchLink = page.locator('.header__icon');
        this.logInButton = page.getByText("My orders");
        this.searchField = page.getByPlaceholder('Search products');
        this.search_result_locator = page.locator("//a[@class='recommended-product__coverLink']");
        this.productToList = page.getByText("+ Add");
        this.goToCheckout = page.getByRole('link', { name: 'Checkout' });
        this.testURL = 'https://test.ua/en';
        this.banner_to_be_visible = '//html/body/div[2]/div/div[1]/header/div[3]/nav/ul/li[4]/a[1]';
        this.massive_of_tags = [/^Skin and hair$/, /^Mood and sleep$/, /^Immunity$/, /^Vitality$/];
        this.loginField = page.getByPlaceholder('E-mail or phone number');
        this.passwordField = page.getByPlaceholder('Password');
        this.toLogInLink = page.getByText("My orders");
        this.fillOutEmail=page.getByPlaceholder('E-mail', { exact: true });
        this.subscribeButton=page.getByRole('button', { name: 'Subscribe' }).nth(1);
        this.fillOutUsername=page.getByRole('textbox', { name: 'Name Surname', exact: true });
        this.bannerTitle=page.getByRole('heading', { name: 'Get -10% off your first order' });
    }
    async goto() {
        await this.page.goto('https://test.ua/en');
    }
}