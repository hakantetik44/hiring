export class BasePage {
    protected navigateTo(path: string) {
        cy.visit(path);
    }

    protected typeText(selector: string, text: string) {
        cy.get(selector).clear().type(text);
    }

    protected clickOn(selector: string) {
        cy.get(selector).click();
    }

    protected checkElement(selector: string) {
        cy.get(selector).check();
    }

    protected verifyVisible(selector: string) {
        cy.get(selector).should('be.visible');
    }

    protected verifyText(selector: string, text: string) {
        cy.get(selector).should('be.visible').and('contain', text);
    }

    protected verifyNotExist(selector: string) {
        cy.get(selector).should('not.exist');
    }

    protected verifyUrl(path: string) {
        cy.url().should('include', path);
    }
}
