export class BasePage {
    navigateTo(path: string) {
        cy.visit(path);
    }

    typeText(selector: string, text: string) {
        cy.get(selector).clear().type(text);
    }

    click(selector: string) {
        cy.get(selector).click();
    }

    verifyText(selector: string, text: string) {
        cy.get(selector).should('contain', text);
    }

    verifyVisible(selector: string) {
        cy.get(selector).should('be.visible');
    }

    verifyNotExist(selector: string) {
        cy.get(selector).should('not.exist');
    }
}
