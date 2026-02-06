import {test, expect} from '@playwright/test';
import { table } from 'console';
import { get } from 'core-js/core/dict';
import { afterEach } from 'node:test';


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


test('dropdown list', async ({page}) => {
    // declare the var for dorpdown alocator 
    const  dropdownList = page.locator('ngx-header nb-select');

    // click on the drop down list to show all options using parent alocator 
    await dropdownList.click();

    // check the value on drop down list 
    page.getByRole('list'); // for UL tag 
    page.getByRole('listitem'); // for LI tag

    const optionList = page.getByRole('list').locator('nb-option');
    await expect (optionList).toHaveText(["Light" , "Dark" , "Cosmic" , "Corporate"]);

    // choose cosmic option from drop downlist 
    await optionList.filter({hasText: 'Cosmic'}).click();
    // declare the backgreound color of the body
    const backgroundColor = await page.locator('nb-layout-header');

    // check that the value is changed through css style (rgb)
    await expect (backgroundColor).toHaveCSS('background-color', 'rgb(50, 50, 89)');

    // check all the css value 
    const colors = {
        "light": 'rgb(255, 255, 255)',
        "dark": 'rgb(34, 43, 69)',
        "cosmic" : 'rgb(50, 50, 89)',
        "corporate" : 'rgb(255, 255, 255)'
    }
    await dropdownList.click();
    for (const color of Object.keys(colors)){
        await optionList.filter({hasText: color}).click();
        await expect(backgroundColor).toHaveCSS('background-color', colors[color]);
        if (color !== 'corporate'){
            await dropdownList.click();
        }
        
    }
});

test('tooltip', async ({page}) => {
    // navigate to tooltip page
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Tooltip').click();

    // decalre tooltip card 
    const tooltipcard = page.locator('nb-card', {hasText: "Tooltip Placements"});
    // hover on the input field to show the tooltip
    await tooltipcard.getByRole('button', {name: "Top"}).hover();

    // declare const for tooltip text
    page.getByRole('tooltip') //if you have a role tooltip created in your html
    const tooltip = await page.locator('nb-tooltip').textContent();
    // check the tooltip text
    expect(tooltip).toEqual('This is a tooltip');

});   

test('dialog box', async ({page}) => {
    // navigate to dialog box page
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();
    //  set alocators for delete btn 


    // check the browser message 
    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?');
        dialog.accept();
    });

    await page.getByRole('table').locator('tr' , {hasText: 'fat@yandex.ru'}).locator('.nb-trash').click();
    await expect(page.locator('table tr').first()).not.toHaveText('fat@yandex.ru');
});

test('web tables' , async ({page}) => {

    // navigate to web table page
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    //1. get the row by any test in this row 
    const targetRow = page.getByRole('row', {name: "twitter@outlook.com"}); 
    const targetAgeCell = targetRow.locator('td').nth(6); 

    //2. click on edit icon to edit the row 
    await targetRow.locator('.nb-edit').click();

    // 3. clear rhe value of age cell 
    await page.locator('input-editor').getByPlaceholder('Age').clear();

    // 4. set the new value for age cell
    await page.locator('input-editor').getByPlaceholder('Age').fill('36');

    // 5. click on check icon to save the changes
    await page.locator('.nb-checkmark').click();

    // 6. check the new value is set or not by assertion
    await expect(targetRow).toContainText('36');        // that's global method 
    await expect(targetAgeCell).toHaveText('36');   //that's specific method to get the age cell and check the value of it ONLY 
    /*---------------------------------------------------------------------------------------------------------------------------- */
    

});


// afterEach(async ({page}) => {
//     // close the page after each test
//     await page.close();
// });

