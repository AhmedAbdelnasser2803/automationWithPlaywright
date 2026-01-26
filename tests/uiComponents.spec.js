import {test, expect} from '@playwright/test';


test.beforeEach(async ({page})=>{
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})


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

test('radio button', async ({page}) => {
    // declare the usingTheGridForm
    const usingTheGridForm = page.locator('nb-card' , {hasText: 'Using the Grid'});
    // check the option1 by label 
    // await usingTheGridForm.getByLabel('Option 1').check({force:true});
    // check the option1 by role
    await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).check({force:true});

    // compare the radio btn is checked or not 
    // declare the const for status of option 1
    // check this status is true
    const radioStatus = await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked();
    await expect(radioStatus).toBeTruthy();
    // check the option 1 without const variable by tobechecked function
    await expect(usingTheGridForm.getByRole('radio', {name: 'Option 1'})).toBeChecked();


    // if checked option 2 the option 1 should not be checked
    await usingTheGridForm.getByLabel('Option 2').check({force:true});
    await expect(await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeFalsy();
    await expect(await usingTheGridForm.getByRole('radio', {name: 'Option 2'})).toBeChecked();
});

test.afterEach(async ({page})=>{
     await page.close();
});