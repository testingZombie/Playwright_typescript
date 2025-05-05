import { chromium, Browser, BrowserContext,Page,test, expect } from "@playwright/test"; 

test('cheapest flight', async({page})=>{
        await page.goto('https://us-en.flightnetwork.com/')
        console.log(await page.title())
        await page.getByRole('button', { name: 'Accept All' }).click();
        await page.getByTestId('searchForm-oneWay-radio-label').click();

        await page.getByTestId('searchForm-singleBound-origin-input').locator('div').filter({ hasText: 'From' }).nth(3).click();
        await page.getByRole('textbox', { name: 'From' }).fill('Bangalore');
        await page.getByTestId('searchForm-LocationDropdownOption-BLR').click();

        await page.getByTestId('searchForm-singleBound-destination-input').locator('div').filter({ hasText: 'To' }).nth(3).click();
        await page.getByRole('textbox', { name: 'To' }).fill('Pune');
        await page.getByTestId("searchForm-LocationDropdownOption-PNQ").click()
        await page.getByTestId('searchForm-searchFlights-button').click();
        const cheapPrice = await page.locator("//span[text()='Cheapest']/../div/span").textContent()
        console.log("Cheapest flight price:", cheapPrice)
        const prices = await page.getByTestId("standard-price").all(); // Fetch all elements
        const priceArr: string[] = []; // Initialize an array
        
        for (const a of prices) {
            const text = await a.textContent(); // Extract text content
            if (text) {
                priceArr.push(text.replace("US$", "").trim());
            }
        }
        console.log(priceArr)

    // Convert string values to numbers and find the minimum
    const minPrice = Math.min(...priceArr.map(price => parseFloat(price)));

    console.log(`Minimum price is: ${minPrice}`)
        
        
        


})


