import {test, expect} from '@playwright/test';
import { NavigationPage } from '../Page-Objects/NavigationPage';
import { FormLayoutPage } from '../Page-Objects/formLayoutPage';
import { DatePickerPage } from '../Page-Objects/datePickePage';

test.beforeEach(async ({page})=>{
    await page.goto('http://localhost:4200/')
})

test('navigate to form layout pgae using page object model',async ({page})=>{
    const navigationpage = new NavigationPage(page);
    await navigationpage.navigateToHomePage();
    await navigationpage.navigateToDatePickerPage();
    await navigationpage.navigateToSmartTablePage();
    await navigationpage.navigateToTooltipPage();
    await navigationpage.navigateToToastPage(); 
})

test('signup usingpageobjectmodel', async ({page})=>{
    const navigationpage = new NavigationPage(page);
    await navigationpage.navigateToHomePage();

    const formLayoutPage = new FormLayoutPage(page);
    await formLayoutPage.signInUisngGridFromAndValidCardentialsAndSelectOptions('test@test.com', 'password', 'Option 1');

    await page.waitForTimeout(2000);

    await formLayoutPage.submitLineFormUsingNameEmailAndCheckRememberMeOption('Jane Doe', 'test@test.com', true);
    await page.waitForTimeout(2000);
})

test('datePicker using BOM', async ({page})=>{
    const navigationpage = new NavigationPage(page);
    await navigationpage.navigateToDatePickerPage();

    const datePickerPage = new DatePickerPage(page);
    await datePickerPage.selectDateFromDatePicker(700);
    await datePickerPage.selectDatePickerWithRangeFromToday(7, 14);

})


