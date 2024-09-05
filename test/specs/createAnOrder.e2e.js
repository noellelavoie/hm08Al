const page = require('../../page');
const helper = require('../../helper');

describe('Create an order', () => {
    it('should set the address', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await expect($(page.fromField)).toHaveValue('East 2nd Street, 601');
        await expect($(page.toField)).toHaveValue('1300 1st St');
    });

    it('should select the supportive plan', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportivePlanCheckbox = await $(page.supportivePlanCheckbox);
        await supportivePlanCheckbox.waitForDisplayed();
        await supportivePlanCheckbox.click();
        await expect($('div=Soundproof curtain')).toBeExisting();
    });

    it('should open phone number modal', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(page.phoneNumberModal);
        await expect(phoneNumberModal).toBeExisting();
    });

    it('should save the phone', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        console.log(phoneNumber)
        await page.submitPhoneNumber(phoneNumber);
        const elementWithPhoneNumber = await helper.getElementByText(phoneNumber);
        console.log(elementWithPhoneNumber);
        await expect($(elementWithPhoneNumber)).toBeExisting();
    });

    it('should add a credit card', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const paymentMethodButton = await $(page.paymentMethodButton);
        await paymentMethodButton.click();
        const addCardButton = await $(page.addCardButton);
        await addCardButton.click();
        const cardNumberField = await $(page.cardNumberField);
        await cardNumberField.setValue('4111 1111 1111');
        const cardCVVField = await $(page.cardCVVField);
        await cardCVVField.setValue('12');
        await cardCVVField.click();
        await browser.pause(1000);
        await expect(addCardButton).toBeExisting();
    });

    it('should write a message for the driver', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const driverMessageField = await $(page.driverMessageField);
        await driverMessageField.setValue('Park out front.');
        await browser.pause(1000);
        await expect(driverMessageField).toBeExisting();

    });

    it('should order a blanket and handkerchiefs', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportivePlanCheckbox = await $(page.supportivePlanCheckbox);
        await supportivePlanCheckbox.waitForDisplayed();
        await supportivePlanCheckbox.click();
        const handkerchiefCheckbox = await $(page.handkerchiefCheckbox);
        await handkerchiefCheckbox.click();
        const blanketInput = await $(page.blanketInput);
        await expect (blanketInput).toBeSelected();
    });

    it('should order 2 ice creams', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const iceCreamField = await $(page.iceCreamField);
        await iceCreamField.click();
        await iceCreamField.click();
        await browser.pause(1000);
        await expect($(".counter-value")).toHaveText("2")

    });

    it('should check car search modal appears', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const buisnessCarButton = await $(page.buisnessCarButton); 
        await buisnessCarButton.click();
        const orderButton = await $(page.orderButton)
        await orderButton.click()
        const carSearchModal = await $(page.carSearchModal);
        await expect(carSearchModal).toBeExisting();
        await browser.pause(1000);
    }); 

}); 