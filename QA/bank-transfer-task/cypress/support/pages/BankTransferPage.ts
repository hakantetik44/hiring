import { BasePage } from "./BasePage";
import { Locators } from "../locators/BankTransferLocators";

class BankTransferPage extends BasePage {

    visit() {
        this.navigateTo('/transfers/create');
    }

    fillField(field: string, value: string) {
        this.typeText(Locators.formField(field), value);
    }

    selectMode(mode: string) {
        cy.get(Locators.formField(`mode-${mode.toLowerCase()}`)).check();
    }

    setDate(phrase: string) {
        const date = new Date();
        if (phrase === 'tomorrow') date.setDate(date.getDate() + 1);
        else if (phrase === 'yesterday') date.setDate(date.getDate() - 1);
        else if (phrase.includes('days')) date.setDate(date.getDate() + parseInt(phrase));
        this.typeText(Locators.formField('transfer-date'), date.toISOString().split('T')[0]);
    }

    submit() {
        this.click(Locators.submitButton);
    }

    verifyNotification(text: string) {
        this.verifyText(Locators.notification, text);
    }
}

export const bankTransferPage = new BankTransferPage();
