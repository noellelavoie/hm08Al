module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    cardNumberField: '#number',
    cardCVVField: '.card-second-row #code',
    phoneCode: '#code',
    supportivePlanCheckbox: 'div=Supportive',
    driverMessageField: '#comment',
    handkerchiefCheckbox: 'span.slider.round',
    blanketCheckbox: 'div=Blanket-and-handkerchiefs',
    iceCreamField: 'div=+',
    blanketInput: 'input.switch-input',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    addCardButton: 'div=Add card',
    searchButton: 'button=Car search',
    buisnessCarButton: 'div=Business',
    orderButton: 'span=Enter the number and order',
    paymentMethodButton: 'div.pp-button.filled',
    // Modals
    phoneNumberModal: '.modal',
    carSearchModal: 'div=Car search',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        console.log("clicked on next button")
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(5000);
        const codeField = await $(this.phoneCode);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
};