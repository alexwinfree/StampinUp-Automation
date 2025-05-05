import { test, expect } from '@playwright/test';

const email = 'testing3211110000@gmail.com'; // this needs to be updated every test run until I find out how to delete accounts.  
const password = 'TESTING!@#';

test.describe('StampinUp User Flow', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.stampinup.com/');
  });

  test('Register New User', async ({ page }) => {
    await page.goto('https://www.stampinup.com/');
    await page.getByTestId('menu-user-btn-signin').click();
    await page.getByTestId('btn-create-account').click();
    await page.getByTestId('reg-first-name').click();
    await page.getByTestId('reg-first-name').fill('testing');
    await page.getByTestId('reg-last-name').click();
    await page.getByTestId('reg-last-name').fill('testing1234');
    await page.getByTestId('reg-email').click();
    await page.getByTestId('reg-email').fill(email);
    await page.getByRole('textbox', { name: 'Password', exact: true }).click();
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill(password);
    await page.getByRole('textbox', { name: 'Confirm Password' }).click();
    await page.getByRole('textbox', { name: 'Confirm Password' }).fill(password);
    await page.getByTestId('reg-submit').click();
    await expect(page.getByRole('button', { name: 'Maybe Later' })).toBeVisible();
    await page.getByRole('button', { name: 'Maybe Later' }).click();
    await page.getByTestId('confirm-dialog').locator('button').filter({ hasText: 'Close' }).click();
  });

  test('Edit Contact Info', async ({ page }) => {
    await page.getByTestId('menu-user-btn-signin').click();
    await page.locator('div').filter({ hasText: /^Email or ID$/ }).nth(3).click();
    await page.getByTestId('auth-email').click();
    await page.getByTestId('auth-email').fill(email);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByTestId('auth-submit').click();
    await expect(page.getByRole('button', { name: 'Hello , testing' })).toBeVisible();
    await page.getByRole('button', { name: 'Hello , testing' }).click();
    await page.getByRole('menuitem', { name: 'Account Settings' }).click();
    await page.getByTestId('account-card-contact').getByTestId('edit-contact-setting').click();
    await page.getByTestId('account-card-firstName').fill('UpdatedName');
    await page.getByTestId('save-changes').click();
    await page.getByTestId('account-card-contact').getByText('UpdatedName').click();
  });

  test('Edit and Add Addresses', async ({ page }) => {
    await page.getByTestId('menu-user-btn-signin').click();
    await page.locator('div').filter({ hasText: /^Email or ID$/ }).nth(3).click();
    await page.getByTestId('auth-email').click();
    await page.getByTestId('auth-email').fill(email);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByTestId('auth-submit').click();

    await expect(page.getByRole('button', { name: 'Hello , UpdatedName' })).toBeVisible();
    await page.getByRole('button', { name: 'Hello , UpdatedName' }).click();
    await page.getByRole('menuitem', { name: 'Account Settings' }).click();
    await page.getByRole('link', { name: 'Addresses' }).click();
    await page.locator('div').filter({ hasText: /^First Name$/ }).nth(1).click();
    await page.getByTestId('address-field-first-name').fill('testing');
    await page.getByTestId('address-field-first-name').press('Tab');
    await page.getByTestId('address-field-last-name').fill('123');
    await page.getByTestId('address-field-last-name').press('Tab');
    await page.getByTestId('address.addressLine1').fill('571 W 1350 S');
    await page.getByTestId('address-field-city-container').locator('div').nth(3).click();
    await page.getByTestId('address-field-city').fill('Orem');
    await page.getByTestId('autocomplete-field-div').click();
    await page.getByTestId('autocomplete-field-div').fill('utah');
    await page.getByText('Utah').click();
    await page.getByTestId('address-field-postalCode').click();
    await page.getByTestId('address-field-postalCode').fill('84663');
    await page.locator('div').filter({ hasText: /^Phone Number$/ }).nth(3).click();
    await page.getByTestId('address-telephone').fill('(801) 489 - 5796');
    await page.locator('div:nth-child(3) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple').click();
    await page.locator('.v-input--selection-controls__ripple').first().click();
    await page.getByTestId('address-save').click();
    await expect(page.getByRole('heading', { name: 'Default Shipping Address' })).toBeVisible();
    await page.getByRole('heading', { name: 'Default Mailing Address' }).click();
    await expect(page.getByRole('heading', { name: 'Default Mailing Address' })).toBeVisible();
  });

  test('Navigate Account Sections', async ({ page }) => {
    await page.getByTestId('menu-user-btn-signin').click();
    await page.locator('div').filter({ hasText: /^Email or ID$/ }).nth(3).click();
    await page.getByTestId('auth-email').click();
    await page.getByTestId('auth-email').fill(email);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByTestId('auth-submit').click();

    await expect(page.getByRole('button', { name: 'Hello , UpdatedName' })).toBeVisible();
    await page.getByRole('button', { name: 'Hello , UpdatedName' }).click();
    await page.getByRole('menuitem', { name: 'Account Settings' }).click();

    await page.getByRole('link', { name: 'My Lists' }).click();
    await page.getByTestId('wishlist-card').click();

    await page.getByRole('link', { name: 'My Orders' }).click();
    await page.getByTestId('account-nav').getByRole('link', { name: 'Rewards' }).click();
    await page.getByTestId('account-nav').getByRole('link', { name: 'Demonstrator' }).click();
    await page.getByRole('link', { name: 'Payment' }).click();
    await page.getByRole('link', { name: 'Addresses' }).click();
  });

  test('Logout', async ({ page }) => {
    await page.getByTestId('menu-user-btn-signin').click();
    await page.locator('div').filter({ hasText: /^Email or ID$/ }).nth(3).click();
    await page.getByTestId('auth-email').click();
    await page.getByTestId('auth-email').fill(email);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByTestId('auth-submit').click();
    await expect(page.getByRole('button', { name: 'Hello , UpdatedName' })).toBeVisible();
    await page.getByRole('button', { name: 'Hello , UpdatedName' }).click();
    await page.getByTestId('auth-logout').click();
  });
});