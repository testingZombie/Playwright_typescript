import { Page, Locator } from '@playwright/test';
 
export class DashboardPage {
  private readonly page: Page;
  private readonly notesLink: Locator;
  private readonly profileMenu: Locator;
  private readonly logoutButton: Locator;
 
  constructor(page: Page) {
    this.page = page;
    this.notesLink = this.page.locator("[aria-label='Notes']");
    this.profileMenu = this.page.locator('.ProfileButton-avatar');
    this.logoutButton = this.page.getByTestId('account-menu-logout');
  }
 
  async navigateToNotes(): Promise<Page> {
    // Store the original context to manage new tab
    const originalPage = this.page.context();
    // Create a new promise to catch the new page
    const newPagePromise = originalPage.waitForEvent('page');
    // Click on notes link (which opens in new tab)
    await this.notesLink.click();
    // Wait for the new page to open
    const notesPage = await newPagePromise;
    // Wait for the page to load
    // await notesPage.waitForLoadState('networkidle');
    return notesPage
  }
  
async switchToOriginalPage(originalPage:Page):Promise<void>{
  await originalPage.bringToFront();
}
 
  async logout(): Promise<void> {
    await this.profileMenu.click();
    await this.logoutButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}