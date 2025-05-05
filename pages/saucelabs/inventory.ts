import { Locator, Page, expect } from "@playwright/test";

export class InventoryPage{
    private page:Page;
    private addToCartButtons:Locator
    private beforeFilterPrice:Locator
    private dropDown:Locator
    private cart:Locator

    constructor(page:Page){
        this.page=page;
        this.addToCartButtons = page.getByRole('button', {name:'Add to cart'});
        this.beforeFilterPrice = page.locator(".inventory_item_price");
        this.dropDown = page.locator(".product_sort_container")
        this.cart = page.locator(".shopping_cart_link")
        
    }
    async countAddToCart():Promise<number>{
        return await this.addToCartButtons.count()
    }

    async getPrices(order: 'asc' | 'desc'){
        const prices = await this.beforeFilterPrice.allTextContents()
        const priceNumbers = prices.map((ele)=>{
            return parseFloat(ele.replace('$',''))
        })
        const sortedPrices = [...priceNumbers].sort((a,b)=>
            order === 'asc' ? a-b : b-a )
        return sortedPrices
    }

    async sortProductsByPrice(order: 'asc'|'desc'){
        this.page.selectOption('.product_sort_container', order==='asc' ? {label: 'Price (low to high)'}:'Price (high to low)');
    }
    
    async verifyPriceSorting(order: 'asc'|'desc'){
        const beforeFilter = await this.getPrices(order);
        
        await this.sortProductsByPrice(order)
        const afterFilter = await this.getPrices(order);

        return {
            actualPrices: beforeFilter,
            expectedPrices:afterFilter
        }

    }


    async addItemToCart(itemIndex: number){
        const productContainer = this.page.locator('.inventory_item').nth(itemIndex)
        const productName = await productContainer.locator('.inventory_item_name ').textContent()
        const productPrice = await productContainer.locator('.inventory_item_price').textContent()
        //add to cart
        await productContainer.locator('.btn_inventory').nth(itemIndex).click()

        return {productName, productPrice}

    }

    async clickCartButton(){
        await this.cart.click()
    }

}