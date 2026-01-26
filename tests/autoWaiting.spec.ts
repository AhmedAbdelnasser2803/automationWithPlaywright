import {expect, test} from '@playwright/test'


test.beforeEach(async ({page})=>{
    await page.goto('https://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
})


