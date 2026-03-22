import {test, expect} from '@playwright/test';
import { NavigationPage } from '../Page-Objects/NavigationPage';

test.beforeEach(async ({page})=>{
    await page.goto('http://localhost:4200/')
})

test('navigate to form layout pgae using page object model',async ({page})=>{
    const navigationpage = new NavigationPage(page);
    await navigationpage.navigateToHomePage();
})


