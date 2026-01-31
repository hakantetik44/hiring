export class BasePage {
    protected readonly defaultTimeout = 15000;

    waitForElementAndClick(selector: string): void {
        cy.get(selector, { timeout: this.defaultTimeout }).should('be.visible').first().click({ force: true });
    }

    waitForElementAndType(selector: string, text: string): void {
        cy.get(selector, { timeout: this.defaultTimeout }).should('be.visible').first().clear().type(text);
    }

    navigateTo(path: string): void {
        cy.visit(path);
    }

    verifyUrl(expectedUrl: string): void {
        cy.url().should('include', expectedUrl);
    }

    verifyHeadingContains(text: string): void {
        cy.get('h1', { timeout: this.defaultTimeout })
            .should('be.visible')
            .invoke('text')
            .then(headingText => {
                expect(headingText.toLowerCase()).to.include(text.toLowerCase());
            });
    }

    acceptCookies(selector: string): void {
        cy.get('body').then($body => {
            if ($body.find(selector).length > 0) {
                cy.get(selector).should('be.visible').click({ force: true });
            }
        });
    }
}
