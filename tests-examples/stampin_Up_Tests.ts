import { test, expect } from '@playwright/test';

const email = 'alexwinfree8@gmail.com';
const password = 'AASDDF@123';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.stampinup.com/');
});

test.describe('StampinUp Flow', () => {

  test('Register New User', async ({ page }) => {
    await page.getByTestId('desktop-header').locator('path').nth(1).click();
    await page.getByTestId('menu-user-btn-signin').click();
    await page.getByTestId('btn-create-account').click();
    await page.getByTestId('reg-first-name').fill('Testing');
    await page.getByTestId('reg-last-name').fill('Testing123');
    await page.getByTestId('reg-email').fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('textbox', { name: 'Confirm Password' }).fill(password);
    await page.getByTestId('reg-submit').click();
    await page.getByRole('button', { name: 'Maybe Later' }).click();
    await page.getByTestId('confirm-dialog').getByRole('button', { name: 'Close' }).click();
  });

  test('Edit Account Settings & Add Default Address', async ({ page }) => {
    await page.getByTestId('desktop-header').locator('svg').nth(1).click();
    await page.getByRole('button', { name: 'Hello ,  Testing' }).click();
    await page.getByRole('menuitem', { name: 'Account Settings' }).click();
    await page.getByRole('link', { name: 'Addresses' }).click();

    await page.getByTestId('address-field-first-name').fill('Testing');
    await page.getByTestId('address-field-last-name').fill('Testing123');
    await page.getByTestId('address.addressLine1').fill('571 W 1350 S');
    await page.getByTestId('address.addressLine1').press('ArrowDown');
    await page.getByTestId('address.addressLine1').press('Enter');
    await page.getByTestId('address-telephone').fill('(801) 489 - 5796');
    await page.locator('.v-input--selection-controls__ripple').first().click();
    await page.getByTestId('address-save').click();
  });

  test('Edit Address', async ({ page }) => {
    await page.getByTestId('address-list-default').getByTestId('addresslist-item-btn-edit').click();
    await page.getByTestId('address.addressLine1').fill('800 N ');
    await page.getByText('Nash Rd, Seward, AK 99664').click();
    await page.getByText('Make this my default mailing').click();
    await page.getByTestId('address-save').click();
  });

  test('Logout and Login', async ({ page }) => {
    await page.getByTestId('desktop-header').locator('svg').nth(1).click();
    await page.getByRole('button', { name: 'Hello ,  Testing' }).click();
    await page.getByTestId('auth-logout').click();

    await page.getByTestId('menu-user-btn-signin').click();
    await page.getByTestId('auth-email').fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByTestId('auth-submit').click();
  });

  test('Add Second Address', async ({ page }) => {
    await page.getByRole('button', { name: 'Hello ,  Testing' }).click();
    await page.getByRole('menuitem', { name: 'Addresses' }).click();
    await page.getByTestId('btn-create').click();

    await page.getByTestId('address-field-first-name').fill('TESt321');
    await page.getByTestId('address-field-last-name').fill('Tesdt');
    await page.getByTestId('address.addressLine1').fill('571 W ');
    await page.getByRole('option', { name: 'W G St, Colton, CA 92324-2222' }).locator('div').first().click();
    await page.getByText('Make this my default mailing').click();
    await page.getByTestId('address-telephone').fill('(801) 489 - 5736');
    await page.getByTestId('address-save').click();
  });

});
