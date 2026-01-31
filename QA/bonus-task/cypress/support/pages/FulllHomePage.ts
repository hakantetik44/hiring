import { BasePage } from './BasePage';
import { FulllSiteLocators } from '../locators/FulllSiteLocators';

class FulllHomePage extends BasePage {
    open(): void {
        this.navigateTo('/');
        this.acceptCookies(FulllSiteLocators.cookieAcceptButton);
    }

    openSolutionsMenu(): void {
        this.waitForElementAndClick(FulllSiteLocators.solutionsDropdown);
    }

    selectSolution(solutionName: string): void {
        if (solutionName.toLowerCase().includes('production')) {
            this.waitForElementAndClick(FulllSiteLocators.solutionMissionComptable);
        }
    }

    verifyPageRedirect(expectedPage: string): void {
        if (expectedPage.toLowerCase().includes('production')) {
            this.verifyUrl('/mission-comptable');
        }
    }

    verifyPageHeading(expectedText: string): void {
        this.verifyHeadingContains(expectedText);
    }
}

export const fulllHomePage = new FulllHomePage();
