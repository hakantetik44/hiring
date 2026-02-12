import { BasePage } from "./BasePage";
import { Locators } from "../locators/BankTransferLocators";

class BankTransferPage extends BasePage {

    visit() {
        this.navigateTo('/transfers/create');
    }

    fillField(fieldName: string, value: string) {
        this.typeText(Locators.formField(fieldName), value);
    }

   selectMode(mode: string) {
        const selector = Locators.formField(`mode-${mode.toLowerCase()}`);
        cy.get(selector).check();
    }

    setDate(phrase: string) {
        const date = new Date();
        if (phrase === 'tomorrow') date.setDate(date.getDate() + 1);
        else if (phrase === 'yesterday') date.setDate(date.getDate() - 1);
        else if (phrase.includes('days')) date.setDate(date.getDate() + parseInt(phrase));

        const formattedDate = date.toISOString().split('T')[0];
        this.typeText(Locators.formField('transfer-date'), formattedDate);
    }

    submit() {
        this.click(Locators.submitButton);
    }

    verifyNotification(text: string) {
        this.verifyText(Locators.notification, text);
    }

    verifyErrorVisible(field: string) {
        this.verifyVisible(Locators.errorMessage(field));
    }

    verifyFormHidden() {
        this.verifyNotExist(Locators.submitButton);
    }
}

export const bankTransferPage = new BankTransferPage();
