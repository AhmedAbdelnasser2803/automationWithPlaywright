import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutPage extends HelperBase {
    constructor(page: Page) {
        super(page);
    }

    /**
     * using grid form to sign in 
     * @param email set valid email 
     * @param password set valid password
     * @param options select any option on the grid
     */

    async signInUisngGridFromAndValidCardentialsAndSelectOptions(email: string, password: string, options: string){
        const usingGridForm = await this.page.locator('nb-card' , {hasText: 'Using the Grid'});
        await usingGridForm.getByRole('textbox', {name: 'Email'}).fill(email);
        await usingGridForm.getByRole('textbox', {name: 'Password'}).fill(password);
        await usingGridForm.getByRole('radio', {name: options}).check({force: true});
        await usingGridForm.getByRole('button', {name: 'Sign in'}).click();
    }
    
    /**
     * signin using inline form and check remember me option
     * @param name set valid name 
     * @param email set valid email
     * @param rememberMe chack or not check remember me option
     */
    async submitLineFormUsingNameEmailAndCheckRememberMeOption(name: string, email: string, rememberMe: boolean){
        const inLineForm = await this.page.locator('nb-card' , {hasText: 'Inline form'});
        await inLineForm.getByRole('textbox', {name: 'Jane Doe'}).fill(name);
        await inLineForm.getByRole('textbox', {name: 'Email'}).fill(email);

        if (rememberMe)
            await inLineForm.getByRole('checkbox', {name: 'Remember me'}).check({force: true});
        await inLineForm.getByRole('button', {name: 'submit'}).click();
    }
}