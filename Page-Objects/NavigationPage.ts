import { Page } from "@playwright/test";

export class NavigationPage {
    readonly page: Page;

    constructor(page : Page) {
        this.page = page;
    }

    async navigateToHomePage() {
        this.selectGroupmenueItem('Forms');
        await this.page.getByText('Form Layouts').click();
    }
    async navigateToDatePickerPage() {
        this.selectGroupmenueItem('Forms');
        await this.page.getByText('Datepicker').click();
    }

    async navigateToSmartTablePage() {
        this.selectGroupmenueItem('Tables & Data');
        await this.page.getByText('Smart Table').click();
    }

    async navigateToTooltipPage() {
        this.selectGroupmenueItem('Modal & Overlays');
        await this.page.getByText('Tooltip').click();
    }

    async navigateToToastPage() {
        this.selectGroupmenueItem('Modal & Overlays');
        await this.page.getByText('Toast').click();
    }  
    
    private async selectGroupmenueItem(mainMenu: string) {
        const selectGroupMenueItem = this.page.getByTitle(mainMenu)
        const expandedStatus = await selectGroupMenueItem.getAttribute('aria-expanded');
        if (expandedStatus === 'false') {
            await selectGroupMenueItem.click();
        }   
     } 
}