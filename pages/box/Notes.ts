import { Page, Locator, TestInfo } from '@playwright/test';
 
export class NotesPage {
  private readonly page: Page;
  private readonly frame:any
  private readonly newNoteButton: Locator;
  private readonly noteTitleInput: Locator;
  private readonly optionButton: Locator;
  private readonly deleteNoteButton: Locator;
  private readonly confirmDeleteButton: Locator;
  private readonly info:TestInfo;
 
  constructor(page: Page, info:TestInfo) {
    this.page = page;
    this.info = info;
    
    // Selectors for notes page in new tab
    this.frame = this.page.frameLocator('#service_iframe')
    this.newNoteButton = this.frame.getByTestId('create-note-button');
    this.noteTitleInput = this.frame.locator("//div[@id='mod-pad-1']//h1[@class='document-title']")
    this.optionButton = this.frame.getByTestId('options-menu-trigger');
    this.deleteNoteButton = this.frame.getByText("Delete this note");
    this.confirmDeleteButton = page.locator('button[data-testid="confirm-delete"]');
  }
 
  async NewNote(page2:Page): Promise<void> {
    await page2.locator('iframe[name="service_iframe"]').contentFrame().getByTestId('create-note-button').click();
    await page2.locator('iframe[name="service_iframe"]').contentFrame().locator("//div[@id='mod-pad-1']//h1[@class='document-title']").click();

    // await this.noteTitleInput.fill("My Assignment");
  }
  async deleteNote(page2:Page):Promise<void>{
    await page2.locator('iframe[name="service_iframe"]').contentFrame().getByTestId('options-menu-trigger').click()
    await page2.locator('iframe[name="service_iframe"]').contentFrame().getByText("Delete this note").click()
    // Wait for save confirmation
    await this.page.waitForTimeout(2000);

  }
  async closeNotesPage(): Promise<void>{
    await this.page.close();
  }
  }


  // const page1Promise = page.waitForEvent('popup');
  // await page.getByTestId('CollapsibleSidebar-wrapper').getByRole('link', { name: 'Notes' }).click();
  // const page1 = await page1Promise;
  // await page1.goto('https://app.box.com/notes/1816908457845');
  // await page1.locator('iframe[name="service_iframe"]').contentFrame().getByTestId('create-note-button').click();
  // await page1.locator('iframe[name="service_iframe"]').contentFrame().getByRole('textbox', { name: 'Add a Title' }).click();
  // await page1.locator('iframe[name="service_iframe"]').contentFrame().getByRole('textbox', { name: 'Add a Title' }).fill('ahdhk');
  // await page1.locator('iframe[name="service_iframe"]').contentFrame().getByTestId('options-menu-trigger').click();
  // await page1.locator('iframe[name="service_iframe"]').contentFrame().getByRole('menuitem', { name: 'Delete this note' }).click();
  // await page.getByRole('button', { name: 'Toggle account menu' }).click();
  // await page.getByTestId('account-menu-logout').click();