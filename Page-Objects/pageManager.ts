import { expect, test } from '@playwright/test';
import { NavigationPage } from '../Page-Objects/NavigationPage';
import { FormLayoutPage } from '../Page-Objects/formLayoutPage';
import { DatePickerPage } from '../Page-Objects/datePickePage';
import { Page } from '@playwright/test';

export class PageManager {
    private readonly page: Page
    private navigationPage: NavigationPage;
    private formLayoutPage: FormLayoutPage;
    private datePickerPage: DatePickerPage;

    constructor(page: Page) {
        this.page = page;
        this.navigationPage = new NavigationPage(this.page); 
        this.formLayoutPage = new FormLayoutPage(this.page);
        this.datePickerPage = new DatePickerPage(this.page);
    }
    navigateTo() {
        return this.navigationPage;
    }
    formLayout() {
        return this.formLayoutPage;
    }
    datePicker() {
        return this.datePickerPage;
    }
}


