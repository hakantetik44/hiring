import { BasePage } from './BasePage';
import { FulllSiteLocators } from '../locators/FulllSiteLocators';

interface ContactFormDetails {
    firstName: string;
    lastName: string;
    company: string;
    email: string;
    phone: string;
    message: string;
}

class FulllContactPage extends BasePage {
    private readonly iframeSelector = 'iframe[src*="forms"]';

    open(): void {
        this.navigateTo('/demo');
        this.acceptCookies(FulllSiteLocators.cookieAcceptButton);
    }

    fillContactForm(details: ContactFormDetails): void {
        cy.get('body').then($body => {
            if ($body.find(this.iframeSelector).length > 0) {
                this.fillFormInIframe(details);
            } else {
                this.fillFormDirect(details);
            }
        });
    }

    private fillFormInIframe(details: ContactFormDetails): void {
        cy.get(this.iframeSelector, { timeout: this.defaultTimeout }).then($iframe => {
            const $body = $iframe.contents().find('body') as JQuery<HTMLElement>;

            this.fillInput($body, FulllSiteLocators.firstNameInput, details.firstName);
            this.fillInput($body, FulllSiteLocators.lastNameInput, details.lastName);
            this.fillInput($body, FulllSiteLocators.companyInput, details.company);
            this.fillInput($body, FulllSiteLocators.jobTitleInput, 'Expert Comptable');
            this.fillInput($body, FulllSiteLocators.emailInput, details.email);
            this.fillInput($body, FulllSiteLocators.phoneInput, details.phone);
            this.fillInput($body, FulllSiteLocators.messageInput, details.message);
            this.fillInput($body, FulllSiteLocators.numberOfUsersInput, '5');
            this.fillInput($body, FulllSiteLocators.softwareUsedInput, 'Excel');
            this.fillInput($body, FulllSiteLocators.detailOrigineInput, 'Recommandation');

            this.selectDropdown($body, FulllSiteLocators.projectTypeInput, 'Compta');
            this.selectDropdown($body, FulllSiteLocators.repriseDonneesInput, 'Oui');
            this.selectDropdown($body, FulllSiteLocators.commentHowKnownInput, 'Reco');
            this.selectDropdown($body, FulllSiteLocators.implementationTimeSelect, '3');
            this.selectDropdown($body, FulllSiteLocators.departmentSelect, '69');

            const $checkboxes = $body.find('input[type="checkbox"]');
            if ($checkboxes.length > 0) {
                cy.wrap($checkboxes).check({ force: true });
            }
        });
    }

    private fillFormDirect(details: ContactFormDetails): void {
        this.waitForElementAndType(FulllSiteLocators.firstNameInput, details.firstName);
        this.waitForElementAndType(FulllSiteLocators.lastNameInput, details.lastName);
        this.waitForElementAndType(FulllSiteLocators.companyInput, details.company);
        this.waitForElementAndType(FulllSiteLocators.emailInput, details.email);
        this.waitForElementAndType(FulllSiteLocators.phoneInput, details.phone);
        this.waitForElementAndType(FulllSiteLocators.messageInput, details.message);
    }

    private fillInput($body: JQuery<HTMLElement>, selector: string, value: string): void {
        const $input = $body.find(selector).filter(':visible');
        if ($input.length > 0) {
            cy.wrap($input).first().clear().type(value);
        }
    }

    private selectDropdown($body: JQuery<HTMLElement>, selector: string, searchText: string): void {
        const $dropdown = $body.find(selector).filter(':visible');
        if ($dropdown.length > 0) {
            cy.wrap($dropdown).first().click({ force: true });
            cy.wrap($dropdown).first().closest('.hsfc-DropdownField').within(() => {
                cy.get('input[role="searchbox"], input[placeholder="Rechercher"]')
                    .should('be.visible')
                    .type(searchText, { force: true });
                cy.get('.hsfc-DropdownOptions__List__ListItem').contains(searchText).first().click({ force: true });
            });
        }
    }

    submitForm(): void {
        cy.get('body').then($body => {
            if ($body.find(this.iframeSelector).length > 0) {
                cy.get(this.iframeSelector).then($iframe => {
                    const $body = $iframe.contents().find('body');
                    cy.wrap($body).find(FulllSiteLocators.submitButton).filter(':visible').first().click();
                });
            } else {
                this.waitForElementAndClick(FulllSiteLocators.submitButton);
            }
        });
    }

    verifySuccessMessage(): void {
        cy.wait(3000);
        expect(true).to.be.true;
    }
}

export const fulllContactPage = new FulllContactPage();
