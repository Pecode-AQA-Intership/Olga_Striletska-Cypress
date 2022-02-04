import { faker } from '@faker-js/faker';

const FAKE_FULL_NAME = faker.name.findName();
const FAKE_EMAIL = faker.internet.email();
const FAKE_ADDRESS = faker.address.secondaryAddress();
const FAKE_PHONE = faker.phone.phoneNumber();

describe('Lesson14: Text Box Form', () => {
  before(() => {
    cy.visit('https://demoqa.com/text-box');
  });

  afterEach(() => {
    cy.reload(); // cleanup text from the inputs fields
  });

  it('Should fill in data correctly', () => {
    cy.get('#userForm #userName').type(FAKE_FULL_NAME).should('have.value', FAKE_FULL_NAME);
    cy.get('#userForm #userEmail').type(FAKE_EMAIL).should('have.value', FAKE_EMAIL);
    cy.get('#userForm #currentAddress').type(FAKE_ADDRESS).should('have.value', FAKE_ADDRESS);
    cy.get('#userForm #permanentAddress').type(FAKE_ADDRESS).should('have.value', FAKE_ADDRESS);
  });

  it('Submit button should be visible', () => {
    cy.get('#userForm #submit').should('be.visible');
  });

  it('Check submit result', () => {
    cy.get('#userForm #userName').type(FAKE_FULL_NAME);
    cy.get('#userForm #userEmail').type(FAKE_EMAIL);
    cy.get('#userForm #currentAddress').type(FAKE_ADDRESS);
    cy.get('#userForm #permanentAddress').type(FAKE_ADDRESS);

    cy.get('#userForm #submit').click();

    cy.get('#output #name').contains(FAKE_FULL_NAME);
    cy.get('#output #email').contains(FAKE_EMAIL);
    cy.get('#output #currentAddress').contains(FAKE_ADDRESS);
    cy.get('#output #permanentAddress').contains(FAKE_ADDRESS);
  });
  it('Email input should have red border when invalid data entered', () => {
    cy.get('#userForm #userEmail').type(FAKE_PHONE); // arrange

    cy.get('#userForm #submit').click(); // act

    cy.get('#userForm #userEmail').should('have.class', 'field-error'); // assert
  });
});
//
