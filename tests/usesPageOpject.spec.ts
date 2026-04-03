import { PageManager } from "../Page-Objects/pageManager"

import { expect, test } from '@playwright/test';

test.beforeEach(async ({page})=>{
    await page.goto('http://localhost:4200/')
})

test('navigate to form layout pgae using page object model',async ({page})=>{
    const pm = new PageManager(page);

    await pm.navigateTo().navigateToHomePage();
    await pm.navigateTo().navigateToDatePickerPage();
    await pm.navigateTo().navigateToSmartTablePage();
    await pm.navigateTo().navigateToTooltipPage();
    await pm.navigateTo().navigateToToastPage(); 


})

test('signup usingpageobjectmodel', async ({page})=>{
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToHomePage();

    await pm.formLayout().signInUisngGridFromAndValidCardentialsAndSelectOptions('test@test.com', 'password', 'Option 1');

    await page.waitForTimeout(2000);

    await pm.formLayout().submitLineFormUsingNameEmailAndCheckRememberMeOption('Jane Doe', 'test@test.com', true);
    await page.waitForTimeout(2000);
})

test('datePicker using BOM', async ({page})=>{
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToDatePickerPage();
    await pm.datePicker().selectDateFromDatePicker(700);
    await pm.datePicker().selectDatePickerWithRangeFromToday(7, 14);
})

 


