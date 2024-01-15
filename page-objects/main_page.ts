import {expect ,type Locator, type Page} from '@playwright/test';

export class MainPage{
    readonly page: Page ; 
    readonly searchLink : Locator;
    readonly logInButton : Locator;  
    readonly searchField : Locator;
readonly search_result_locator: Locator;

constructor(page:Page) {
    this.page=page;
    this.searchLink= page.locator('.header__icon') ;
    this.logInButton=page.getByText("My orders");
    this.searchField=page.getByPlaceholder('Search products');
    this.search_result_locator = page.locator("//a[@class='recommended-product__coverLink']");
}

async goto(){
    await this.page.goto('https://perlahelsa.ua/en');
}
}