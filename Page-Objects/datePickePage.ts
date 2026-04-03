import { Page, expect } from "@playwright/test";

export class DatePickerPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    /** 
     * function to select date from date picker Filed
     * @param numberOfDaysFromToday set the number of days from today to select the date
     */
    async selectDateFromDatePicker(numberOfDaysFromToday: number) {
        // declare variable for date input field
        const dateInputField = this.page.getByPlaceholder('Form Picker');

        // click on th var to open the date picker
        await dateInputField.click();

        const dateToAssert = await this.selectDateInCalender(numberOfDaysFromToday);
        
        expect(dateInputField).toHaveValue(dateToAssert);

    }

    /**
     * select range of date from date picker field
     * @param numberOfDaysFromToday  the start number from today to select the date
     * @param endDaysFromToday the end day from today to select the date
     */
    async selectDatePickerWithRangeFromToday(numberOfDaysFromToday: number ,endDaysFromToday: number) {
        const dateInputField = this.page.getByPlaceholder('Range Picker');

        // click on th var to open the date picker
        await dateInputField.click();

        const dateToAssertStart = await this.selectDateInCalender(numberOfDaysFromToday);
        const dateToAssertEnd = await this.selectDateInCalender(endDaysFromToday);
        
        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`;
        expect(dateInputField).toHaveValue(dateToAssert);
    }


    /**
     * this fundtion to select date from the calender to optimize the code and make it more readable and maintainable
     */
    private async selectDateInCalender(numberOfDaysFromToday: number) {
        // declare the object from date class to set the day 
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + numberOfDaysFromToday);
        const currentDay = (currentDate.getDate()).toString();
        const currentMonthshot = currentDate.toLocaleString('En-US', { month: 'short' });
        const currentMonthlong = currentDate.toLocaleString('En-US', { month: 'long' });
        const currentYear = currentDate.getFullYear();
        const dateToAssert = `${currentMonthshot} ${currentDay}, ${currentYear}`;
        // month and year in the calendar header
        const expectedMonthAndYear = `${currentMonthlong} ${currentYear}`;
        let calenderMonthAndYear = (await this.page.locator('nb-calendar-view-mode').textContent()) ?? ''; 
        while (!calenderMonthAndYear.includes(expectedMonthAndYear))  {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
            calenderMonthAndYear = (await this.page.locator('nb-calendar-view-mode').textContent()) ?? '';
        }
        await this.page.locator('.day-cell.ng-star-inserted').getByText(currentDay, { exact: true }).click();
        return dateToAssert;

    }
}