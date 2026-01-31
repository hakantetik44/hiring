@transfer @bank
Feature: Bank Transfer Creation
  As an authorized user (Administrator or Purchase Manager)
  I want to create bank transfers via a dedicated form
  In order to pay my beneficiaries following business rules and security requirements

  Background:
    Given the user is logged in as an "Administrator"
    And the user navigates to the "Bank Transfer" creation page

  @happy-path @instant
  Scenario: Create a successful instant bank transfer
    When they fill in the transfer form with the following data:
      | Field            | Value                       |
      | Beneficiary Name | John Doe                    |
      | IBAN             | FR7612345678901234567890123 |
      | Label            | Monthly Rent 2024           |
      | Amount           | 1250.50                     |
    And they select the "Instant" transfer mode
    And they submit the transfer form
    Then a success notification "Transfer successfully created" should be displayed

  @happy-path @scheduled
  Scenario: Create a successful scheduled bank transfer for tomorrow
    When they fill in the transfer form with the following data:
      | Field            | Value                       |
      | Beneficiary Name | Tech Solutions Ltd          |
      | IBAN             | DE8912345678901234567890123 |
      | Label            | Software License            |
      | Amount           | 500.00                      |
    And they select the "Scheduled" transfer mode
    And they set the transfer date to "tomorrow"
    And they submit the transfer form
    Then a success notification "Scheduled transfer created" should be displayed

  @boundary @amount
  Scenario Outline: Validate transfer amount boundaries
    When they enter an amount of "<Amount>"
    And they submit the transfer form
    Then they should see a validation message for "<Amount>" as "<Status>"

    Examples:
      | Amount    | Status  | Comment      |
      | 0.01      | Success | Min Valid    |
      | 100000    | Success | Max Valid    |
      | 0.00      | Error   | Below Min    |
      | 100000.01 | Error   | Above Max    |

  @boundary @iban
  Scenario Outline: Validate IBAN length constraints
    When they enter an IBAN with length <Length>
    And they submit the transfer form
    Then they should see a validation status for "IBAN" as "<Status>"

    Examples:
      | Length | Status  | Comment        |
      | 14     | Success | Min length     |
      | 34     | Success | Max length     |
      | 13     | Error   | Too short      |
      | 35     | Error   | Too long       |

  @boundary @date
  Scenario Outline: Validate date constraints for scheduled transfers
    And they select the "Scheduled" transfer mode
    When they set the transfer date to "<DatePhrase>"
    And they submit the transfer form
    Then the system should "<Outcome>" the date

    Examples:
      | DatePhrase | Outcome | Comment           |
      | tomorrow   | Accept  | Min Wait (1 day)  |
      | +90 days   | Accept  | Max Wait (90 days)|
      | yesterday  | Reject  | Past date         |
      | +91 days   | Reject  | Beyond limit      |

  @error-handling @label
  Scenario: Reject label with special characters
    When they enter a label "Rent #2024!"
    And they submit the transfer form
    Then they should see an error for the "Label" field

  @rbac @security
  Scenario: Deny transfer creation for unauthorized roles
    Given the user is logged in as a "Standard User"
    When they attempt to access the bank transfer creation page
    Then they should be redirected to the "Dashboard"
    And the transfer form should not be accessible
