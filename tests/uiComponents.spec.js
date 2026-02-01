import {test, expect} from '@playwright/test';


test.beforeEach(async ({page})=>{
    await page.goto('http://localhost:4200/')

})


test('iput field', async ({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    

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
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    
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


test('checkbox', async ({page}) => {
    // navigate to toast component page
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Toastr').click();
    // uncheck the "hiden on click" checkbox by using uncheck method 
    await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force:true});
    // check the "pervent arising of duplicate toast" checkbox by using check method
    await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).check({force:true});
    // using for loop to iterate through all checkboxes
    const allcheckboxes =  page.getByRole('checkbox');
    for (const box of await allcheckboxes.all()){
        await box.check({force:true});
        expect(await box.isChecked()).toBeTruthy();
    }

    // using for loop to uncheck all checkboxes
    for (const box of await allcheckboxes.all()){
        await box.uncheck({force:true});
        expect(await box.isChecked()).toBeFalsy();
    }


});