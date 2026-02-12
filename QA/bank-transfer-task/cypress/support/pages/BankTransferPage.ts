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

    // Yeni ekledik: Hata mesajı görünüyor mu?
    verifyErrorVisible(field: string) {
        cy.get(`[data-testid="error-${field}"]`).should('be.visible');
    }

    // Yeni ekledik: Form tamamen gizli mi?
    verifyFormHidden() {
        cy.get(Locators.submitButton).should('not.exist');
    }
}

export const bankTransferPage = new BankTransferPage();
