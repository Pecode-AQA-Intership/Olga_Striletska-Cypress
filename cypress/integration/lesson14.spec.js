import { randomUserData } from '../constants/user-data';
import { UserForm } from '../page-objects/users-table';

describe('Lesson14: Text Box Form', () => {
  const userForm = new UserForm();
  before(() => {
    cy.visit('https://demoqa.com/text-box');
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Should fill in data correctly', () => {
    userForm.fullNameField
      .type(randomUserData.FAKE_FULL_NAME)
      .should('have.value', randomUserData.FAKE_FULL_NAME);
    userForm.userEmailField
      .type(randomUserData.FAKE_EMAIL)
      .should('have.value', randomUserData.FAKE_EMAIL);
    userForm.currentAddressField
      .type(randomUserData.FAKE_CURRENT_ADDRESS)
      .should('have.value', randomUserData.FAKE_CURRENT_ADDRESS);
    userForm.secondaryAddressField
      .type(randomUserData.FAKE_SECONDARY_ADDRESS)
      .should('have.value', randomUserData.FAKE_SECONDARY_ADDRESS);
  });

  it('Submit button should be visible', () => {
    userForm.submitButton.should('be.visible');
  });

  it('Check submit result', () => {
    userForm.fullNameField.clear().type(randomUserData.FAKE_FULL_NAME);
    userForm.userEmailField.clear().type(randomUserData.FAKE_EMAIL);
    userForm.currentAddressField
      .clear()
      .type(randomUserData.FAKE_CURRENT_ADDRESS);
    userForm.secondaryAddressField
      .clear()
      .type(randomUserData.FAKE_SECONDARY_ADDRESS);

    userForm.submitButton.click();

    userForm.outputName.contains(randomUserData.FAKE_FULL_NAME);
    userForm.outputEmail.contains(randomUserData.FAKE_EMAIL);
    userForm.outputCurrentAddress.contains(randomUserData.FAKE_CURRENT_ADDRESS);
    userForm.outputPermanentAddress.contains(
      randomUserData.FAKE_SECONDARY_ADDRESS,
    );
  });

  it('Email input should have red border when invalid data entered', () => {
    userForm.userEmailField.type(randomUserData.FAKE_MOBILE);

    userForm.submitButton.click();

    userForm.userEmailField.should('have.class', 'field-error');
  });
});
