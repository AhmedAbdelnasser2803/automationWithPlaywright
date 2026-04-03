import { expect, test } from '@playwright/test';
import { NavigationPage } from '../Page-Objects/NavigationPage';
import { FormLayoutPage } from '../Page-Objects/formLayoutPage';
import { DatePickerPage } from '../Page-Objects/datePickePage';
import { Page } from '@playwright/test';
import { HelperBase } from './helperBase';

export class PageManager extends HelperBase {
    private navigationPage: NavigationPage;
    private formLayoutPage: FormLayoutPage;
    private datePickerPage: DatePickerPage;

    constructor(page: Page) {
        super(page);
        this.navigationPage = new NavigationPage(page); 
        this.formLayoutPage = new FormLayoutPage(page);
        this.datePickerPage = new DatePickerPage(page);
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


