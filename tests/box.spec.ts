import { test, expect, Page } from '@playwright/test';
import { BoxLoginPage } from '../pages/box/login';
import { DashboardPage } from '../pages/box/dashboard';
import { NotesPage } from '../pages/box/Notes';
 
test.describe('Box Notes Workflow', () => {
//   const EMAIL = 'ramya.creativites@gmail.com';
//   const PASSWORD = 'P6i#1211';
 
  test('Create and Delete Note Workflow', async ({ page }, testInfo) => { 
    
    // Initialize page objects
    const loginPage = new BoxLoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const notesPages = new NotesPage(page, testInfo);
 
    // Login Step
    await test.step('Login to Box', async () => {
      testInfo.annotations.push({
        type: 'Login',
        description: `Attempting login for user`
      });
      
    //   await loginPage.login(EMAIL, PASSWORD);
      await loginPage.login();
      
      // Verify successful login
        expect(await page.title()).toContain('Box');
      testInfo.annotations.push({
        type: 'Login Status',
        description: 'Successfully logged in'
      });
    });
 
    // Navigate to Notes in New Tab
    await test.step('Open Notes in New Tab', async () => {
    const newP =await dashboardPage.navigateToNotes();
    
    await notesPages.NewNote(newP)
    await notesPages.deleteNote(newP)
    await notesPages.closeNotesPage()
    await dashboardPage.logout()

  })
})
})
