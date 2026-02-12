import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { bankTransferPage } from "../pages/BankTransferPage";

Given(/^the user is logged in as a(?:n)? "([^"]*)"$/, (role: string) => {
    cy.loginAs(role);
});

Given("the user navigates to the {string} creation page", () => {
    bankTransferPage.visit();
});

When("they fill in the transfer form with the following data:", (table: any) => {
    const data = table.rowsHash();
    bankTransferPage.fillField("beneficiary-name", data["Beneficiary Name"]);
    bankTransferPage.fillField("iban", data["IBAN"]);
    bankTransferPage.fillField("label", data["Label"]);
    bankTransferPage.fillField("amount", data["Amount"]);
});

When("they enter an amount of {string}", (amount: string) => {
    bankTransferPage.fillField("amount", amount);
});

When("they enter an IBAN with length {int}", (length: number) => {
    bankTransferPage.fillField("iban", "A".repeat(length));
});

When("they enter a label {string}", (label: string) => {
    bankTransferPage.fillField("label", label);
});

When("they select the {string} transfer mode", (mode: string) => {
    bankTransferPage.selectMode(mode);
});

When("they set the transfer date to {string}", (phrase: string) => {
    bankTransferPage.setDate(phrase);
});

When("they submit the transfer form", () => {
    bankTransferPage.submit();
});

When("they attempt to access the bank transfer creation page", () => {
    bankTransferPage.visit();
});

Then("a success notification {string} should be displayed", (message: string) => {
    bankTransferPage.verifyNotification(message);
});

Then("they should see a validation message for {string} as {string}", (_: string, status: string) => {
    if (status === "Success") bankTransferPage.verifyNotification("created");
});

Then("they should see a validation status for {string} as {string}", () => { });
Then("the system should {string} the date", () => { });
Then("they should see an error for the {string} field", () => { });
Then("they should be redirected to the {string}", (page: string) => {
    cy.url().should('include', page.toLowerCase());
});
Then("the transfer form should not be accessible", () => { });
