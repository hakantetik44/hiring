import { BasePage } from './BasePage';
import { FulllSiteLocators } from '../locators/FulllSiteLocators';

class FulllHomePage extends BasePage {
    open(): void {
        super.open('/');
        this.handleCookieBanner(FulllSiteLocators.cookieAcceptButton);
    }

    navigateToSolutionsMenu(): void {
        this.clickElement(FulllSiteLocators.solutionsDropdown);
    }

    selectSolutionByCategory(category: string): void {
        if (category.toLowerCase().includes('production')) {
            this.clickElement(FulllSiteLocators.solutionMissionComptable);
        }
    }

    validatePageRedirect(path: string): void {
        this.verifyUrlMatching(path);
    }

    validatePageHeading(expectedText: string): void {
        this.verifyHeadingContains(expectedText);
    }
}

export const fulllHomePage = new FulllHomePage();
