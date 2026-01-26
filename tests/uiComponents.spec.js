import {test, expect} from '@playwright/test';


test.beforeEach(async ({page})=>{
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('From Layout Page', async ({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

});

test('iput field', async ({page}) => {

    // declare the const to get the email input field
   const emailInput = await page.locator('nb-card' , {hasText: 'Using the Grid'}).getByPlaceholder('Email');

    // fill the input field with an email
    await emailInput.fill('test@test.com');
    // clear the input field
    await emailInput.clear();

    // using presssequectially to set email by delay 500 ms
    await emailInput.pressSequentially('test@test.com', {delay: 500});

    // generic assertion 
    // using expect to check the value of the input field
    const inputValue = await emailInput.inputValue();
    await expect(inputValue).toEqual('test@test.com');
    // check the value by tohavevalue function
    await expect(emailInput).toHaveValue('test@test.com');



})