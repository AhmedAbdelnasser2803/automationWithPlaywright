import {test} from '@playwright/test'
import { filter } from 'rxjs-compat/operator/filter'

test.beforeEach(async ({page})=>{
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('alocators syntax rules',async ({page})=>{
    // by tag name 
    // get the first element with tag name and click 
    await page.locator('input').first().click()
    
    // by ID 
    page.locator('#inputEmail1')

    //' by class name 
    page.locator('.status-basic')

    // by attribute 
    page.locator('[id="inputEmail1"]')

    // by class value 
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    // combine different selectors 
    page.locator('[placeholder="Email"][nbinput]')

    // by XPath (NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1"]')

    // by partial text match 
    page.locator(':text("Using")')

    // by exact text match 
    await page.locator('text-is("Using the Grid")')
})



test('user facing locators',async ({page})=>{
    // get by role method and click on the element 
    await page.getByRole('textbox',{name: "Email"}).first().click()
    await page.getByRole('button',{name:"Sign in"}).first().click() 
    // get by label method and click on the element 
    await page.getByLabel('Email').first().click()
    await page.getByLabel('Password').first().click()

    // get by the placeholder and click on the element 
    await page.getByPlaceholder('Jane Doe').click()

    // get by text method 
    await page.getByText('Inline form').click()
    await page.getByText('Form Without Label').click()

    // get by title 
    await page.getByTitle('IoT Dashboard').click()
    await page.goBack()

    // get by test id  
    await page.getByTestId('SignIn').click()
})


test('locating child elment',async({page})=>{
    //locate option 1 on form layout by two method  
    await page.locator('nb-card nb-radio :text("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text("Option 2")').click()
    // alocate the signin btn on this sction 
    await page.locator('nb-card').getByRole('button' , {name: "Sign in"}).first().click()

    // alocate the sign up btn by the index 
    await page.locator('nb-card').nth(3).getByRole('button').click()     
})

test('located parent element',async({page})=>{
    // get email element on the "using the grid" card by parent and click 
    await page.locator('nb-card',{hasText:'Using the Grid'})
        .getByRole('textbox',{name:"Email"}).click()

    // get email by uing the email id on the card and click on it 
    await page.locator('nb-card',{has: page.locator('#inputEmail1')})
        .getByRole('textbox',{name:"Email"}).click()

    // using the filter method instead of the second argument on the alocator method
    await page.locator('nb-card').filter({hasText:'Using the Grid'})
        .getByRole('textbox',{name:"Email"}).click()
    // using unique combination on filter method 
    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: 'SIGN IN'})
        .getByRole('textbox',{name:"Email"}).click()
    // get the parent using the .alocator(..)
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox',{name:"Email"}).click()
})