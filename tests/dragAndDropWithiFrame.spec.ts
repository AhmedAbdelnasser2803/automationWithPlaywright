import {expect, test} from '@playwright/test'

test('Drag and drop within an iframe', async ({page}) => {
    // navigate to drag and drop website 
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')
    // click on the second image to open the iframe
    // 1. need to declare frame 
    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')
    // 2. alocate the second image and click on it to open the iframe
    await frame.locator('li' , {hasText: 'High Tatras 2'}).click()

    // using dragto() method to mave the image to the trash 
    await frame.locator('li' , {hasText: 'High Tatras 2'}).dragTo(frame.locator('#trash'))


    // using hover method to move the image to the trash 
    await frame.locator('li' , {hasText: 'High Tatras 3'}).hover()
    await page.mouse.down()
    await frame.locator('#trash').hover()
    await page.mouse.up()


    // check that the two images are added successfully to the trash
    await expect(frame.locator('#trash li h5')).toHaveText(['High Tatras 2', 'High Tatras 3'])
});
