import { getInnerText, getNumbers } from '../../utilities/data';
import {
  sortNumbersASC,
  sortStringsASC,
  sortNumbersDESC,
  sortStringsDESC,
} from '../../utilities/sorting';

import { randomUserData } from '../constants/user-data';

import { RegistrationFormPopup, UserTable } from '../page-objects/users-table';

describe('Lesson15', () => {
  const registrationFormPopup = new RegistrationFormPopup();
  const userTable = new UserTable();

  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
  });

  context('User creating', () => {
    it('Should open registration form', () => {
      userTable.addNewRecordButton.click();

      userTable.modalDialog.should('exist');
    });

    it('Should not create new user if modal closed', () => {
      userTable.addNewRecordButton.click();
      userTable.firstNamePopupField.type(randomUserData.FAKE_FIRST_NAME);
      userTable.lastNamePopupField.type(randomUserData.FAKE_LAST_NAME);
      userTable.userEmailPopupField.type(randomUserData.FAKE_EMAIL);
      userTable.userAgePopupField.type(999);
      userTable.userSalaryPopupField.type(999999);
      userTable.userDepartmentPopupField.type(randomUserData.DEPARTMENT);

      userTable.modalHeaderCloseButton.click();

      cy.contains(randomUserData.FAKE_FIRST_NAME).should('not.exist');
      cy.contains(randomUserData.FAKE_LAST_NAME).should('not.exist');
      cy.contains(randomUserData.FAKE_EMAIL).should('not.exist');
      cy.contains(999).should('not.exist');
      cy.contains(999999).should('not.exist');
      cy.contains(randomUserData.DEPARTMENT).should('not.exist');
    });

    it('Should not close modal if no data entered', () => {
      userTable.addNewRecordButton.click();

      userTable.submitModalButton.click();

      userTable.modalDialog.should('be.visible');
    });

    it('Should apply errors styling to fields with no data', () => {
      userTable.addNewRecordButton.click();

      userTable.submitModalButton.click();

      userTable.firstNamePopupField.should(
        'have.css',
        'border-color',
        'rgb(220, 53, 69)',
      );
      userTable.lastNamePopupField.should(
        'have.css',
        'border-color',
        'rgb(220, 53, 69)',
      );
      userTable.userEmailPopupField.should(
        'have.css',
        'border-color',
        'rgb(220, 53, 69)',
      );
      userTable.userAgePopupField.should(
        'have.css',
        'border-color',
        'rgb(220, 53, 69)',
      );
      userTable.userSalaryPopupField.should(
        'have.css',
        'border-color',
        'rgb(220, 53, 69)',
      );
      userTable.userDepartmentPopupField.should(
        'have.css',
        'border-color',
        'rgb(220, 53, 69)',
      );
    });
    it('Should create new user', () => {
      userTable.addNewRecordButton.click();
      userTable.firstNamePopupField.type(randomUserData.FAKE_FIRST_NAME);
      userTable.lastNamePopupField.type(randomUserData.FAKE_LAST_NAME);
      userTable.userEmailPopupField.type(randomUserData.FAKE_EMAIL);
      userTable.userAgePopupField.type(randomUserData.AGE);
      userTable.userSalaryPopupField.type(randomUserData.SALARY_DOLLARS);
      userTable.userDepartmentPopupField.type(randomUserData.DEPARTMENT);

      userTable.submitModalButton.click();

      cy.contains(randomUserData.FAKE_FIRST_NAME).should('exist');
      cy.contains(randomUserData.FAKE_LAST_NAME).should('exist');
      cy.contains(randomUserData.FAKE_EMAIL).should('exist');
      cy.contains(randomUserData.AGE).should('exist');
      cy.contains(randomUserData.SALARY_DOLLARS).should('exist');
      cy.contains(randomUserData.DEPARTMENT).should('exist');
    });
  });

  context('User editing', () => {
    it('Should have User record edit button', () => {
      userTable.editButton.should('exist');
    });
    it('Should open edit modal on user edit button click', () => {
      cy.get(registrationFormPopup.firstUserCells);
      userTable.editButton.click();
      userTable.modalDialog.should('exist');
    });

    it('Should be able to edit each field in the modal', () => {
      userTable.editButton.click();

      userTable.firstNamePopupField
        .clear()
        .type(randomUserData.FAKE_FIRST_NAME);
      userTable.lastNamePopupField.clear().type(randomUserData.FAKE_LAST_NAME);
      userTable.userEmailPopupField.clear().type(randomUserData.FAKE_EMAIL);
      userTable.userAgePopupField.clear().type(randomUserData.AGE);
      userTable.userSalaryPopupField
        .clear()
        .type(randomUserData.SALARY_DOLLARS);
      userTable.userDepartmentPopupField
        .clear()
        .type(randomUserData.DEPARTMENT);

      userTable.firstNamePopupField.should(
        'have.value',
        randomUserData.FAKE_FIRST_NAME,
      );
      userTable.lastNamePopupField.should(
        'have.value',
        randomUserData.FAKE_LAST_NAME,
      );
      userTable.userEmailPopupField.should(
        'have.value',
        randomUserData.FAKE_EMAIL,
      );
      userTable.userAgePopupField.should('have.value', randomUserData.AGE);
      userTable.userSalaryPopupField.should(
        'have.value',
        randomUserData.SALARY_DOLLARS,
      );
      userTable.userDepartmentPopupField.should(
        'have.value',
        randomUserData.DEPARTMENT,
      );
    });

    it('Should have user data pre-filled in the modal', () => {
      registrationFormPopup.firstUserCells.then((cells) => {
        cy.log(cells);
        const currentFirstName = cells.get(0).innerText;
        const currentLastName = cells.get(1).innerText;
        const currentAge = cells.get(2).innerText;
        const currentEmail = cells.get(3).innerText;
        const currentSalary = cells.get(4).innerText;
        const currentDepartment = cells.get(5).innerText;

        userTable.editButton.click();

        userTable.firstNamePopupField.should('have.value', currentFirstName);
        userTable.lastNamePopupField.should('have.value', currentLastName);
        userTable.userEmailPopupField.should('have.value', currentEmail);
        userTable.userAgePopupField.should('have.value', currentAge);
        userTable.userSalaryPopupField.should('have.value', currentSalary);
        userTable.userDepartmentPopupField.should(
          'have.value',
          currentDepartment,
        );
      });
    });

    it('Should edit existing user', () => {
      registrationFormPopup.firstUserCells
        .eq(0)
        .contains('Cierra')
        .should('exist');
      registrationFormPopup.firstUserCells
        .eq(1)
        .contains('Vega')
        .should('exist');
      registrationFormPopup.firstUserCells.eq(2).contains('39').should('exist');
      registrationFormPopup.firstUserCells
        .eq(3)
        .contains('cierra@example.com')
        .should('exist');
      registrationFormPopup.firstUserCells
        .eq(4)
        .contains('10000')
        .should('exist');
      registrationFormPopup.firstUserCells
        .eq(5)
        .contains('Insurance')
        .should('exist');

      userTable.editButton.click();
      userTable.firstNamePopupField
        .clear()
        .type(randomUserData.FAKE_FIRST_NAME);
      userTable.lastNamePopupField.clear().type(randomUserData.FAKE_LAST_NAME);
      userTable.userEmailPopupField.clear().type(randomUserData.FAKE_EMAIL);
      userTable.userAgePopupField.clear().type(randomUserData.AGE);
      userTable.userSalaryPopupField
        .clear()
        .type(randomUserData.SALARY_DOLLARS);
      userTable.userDepartmentPopupField
        .clear()
        .type(randomUserData.DEPARTMENT);
      userTable.submitModalButton.click();

      registrationFormPopup.firstUserCells
        .eq(0)
        .contains(randomUserData.FAKE_FIRST_NAME)
        .should('exist');
      registrationFormPopup.firstUserCells
        .eq(1)
        .contains(randomUserData.FAKE_LAST_NAME)
        .should('exist');
      registrationFormPopup.firstUserCells
        .eq(2)
        .contains(randomUserData.AGE)
        .should('exist');
      registrationFormPopup.firstUserCells
        .eq(3)
        .contains(randomUserData.FAKE_EMAIL)
        .should('exist');
      registrationFormPopup.firstUserCells
        .eq(4)
        .contains(randomUserData.SALARY_DOLLARS)
        .should('exist');
      registrationFormPopup.firstUserCells
        .eq(5)
        .contains(randomUserData.DEPARTMENT)
        .should('exist');
    });

    it('Should not close modal if edit invalid data in email field', () => {
      registrationFormPopup.firstUserCells
        .eq(0)
        .contains('Cierra')
        .should('exist');
      registrationFormPopup.firstUserCells
        .eq(1)
        .contains('Vega')
        .should('exist');
      registrationFormPopup.firstUserCells.eq(2).contains('39').should('exist');
      registrationFormPopup.firstUserCells
        .eq(3)
        .contains('cierra@example.com')
        .should('exist');
      registrationFormPopup.firstUserCells
        .eq(4)
        .contains('10000')
        .should('exist');
      registrationFormPopup.firstUserCells
        .eq(5)
        .contains('Insurance')
        .should('exist');

      userTable.editButton.click();
      userTable.userEmailPopupField.type(randomUserData.RANDOM_NUMBER);
      userTable.submitModalButton.click();

      userTable.userEmailPopupField.should(
        'have.css',
        'border-color',
        'rgb(220, 53, 69)',
      );
    });
  });

  context('User deleting', () => {
    it('Should have User record delete button', () => {
      userTable.deleteButton.should('exist');
    });
    it('Should delete User on delete user button click', () => {
      registrationFormPopup.firstUserCells.then((oldCells) => {
        const oldFirstName = oldCells.get(0).innerText;
        const oldLastName = oldCells.get(1).innerText;
        const oldAge = oldCells.get(2).innerText;
        const oldEmail = oldCells.get(3).innerText;
        const oldSalary = oldCells.get(4).innerText;
        const oldDepartment = oldCells.get(5).innerText;

        userTable.deleteButton.click();

        registrationFormPopup.firstUserCells.then((newCells) => {
          expect(oldFirstName).to.not.equal(newCells.get(0).innerText);
          expect(oldLastName).to.not.equal(newCells.get(1).innerText);
          expect(oldAge).to.not.equal(newCells.get(2).innerText);
          expect(oldEmail).to.not.equal(newCells.get(3).innerText);
          expect(oldSalary).to.not.equal(newCells.get(4).innerText);
          expect(oldDepartment).to.not.equal(newCells.get(5).innerText);
        });
      });
    });
  });

  context('User searching', () => {
    it('Should have search field visible', () => {
      userTable.searchBox.should('exist');
    });
    it('Should have correct search field placeholder', () => {
      userTable.searchBox.should('have.attr', 'placeholder', 'Type to search');
    });
    it('Should start search on data input', () => {
      userTable.searchBox.as('searchUserInput');

      cy.get('@searchUserInput').click();
      cy.get('@searchUserInput').type('This is the fake text');

      userTable.tableCell.each((cell) => {
        expect(cell.text().trim()).equal('');
      });
    });

    it('Should find User by First name', () => {
      userTable.searchBox.type('Cierra');

      registrationFormPopup.firstUserCells.then((cells) => {
        expect(cells.get(0).innerText).equal('Cierra');
      });
    });

    it('Should find User by Last name', () => {
      userTable.searchBox.type('Vega');

      registrationFormPopup.firstUserCells.then((cells) => {
        expect(cells.get(1).innerText).equal('Vega');
      });
    });
    it('Should find User by Age', () => {
      userTable.searchBox.type('39');

      registrationFormPopup.firstUserCells.then((cells) => {
        expect(cells.get(2).innerText).equal('39');
      });
    });

    it('Should find User by Email', () => {
      userTable.searchBox.type('cierra@example.com');

      registrationFormPopup.firstUserCells.then((cells) => {
        expect(cells.get(3).innerText).equal('cierra@example.com');
      });
    });
    it('Should find User by Salary', () => {
      userTable.searchBox.type('10000');

      registrationFormPopup.firstUserCells.then((cells) => {
        expect(cells.get(4).innerText).equal('10000');
      });
    });
    it('Should find User by Department', () => {
      userTable.searchBox.type('Insurance');

      registrationFormPopup.firstUserCells.then((cells) => {
        expect(cells.get(5).innerText).equal('Insurance');
      });
    });
  });

  context('User sorting', () => {
    it('Should sort ASC by First Name', () => {
      userTable.sortColumnASC(userTable.firstNameHeaderCell);

      userTable.firstCellOnRow.then(getInnerText).then((firstNames) => {
        const manuallySortedFirstNames = sortStringsASC(firstNames);
        expect(firstNames).to.deep.equal(manuallySortedFirstNames);
      });
    });

    it('Should sort DESC by First Name', () => {
      userTable.sortColumnDESC(userTable.firstNameHeaderCell);

      userTable.firstCellOnRow.then(getInnerText).then((firstNames) => {
        const manuallySortedFirstNames = sortStringsDESC(firstNames);
        expect(firstNames).to.deep.equal(manuallySortedFirstNames);
      });
    });

    it('Should sort ASC by Last Name', () => {
      userTable.sortColumnASC(userTable.lastNameHeaderCell);

      userTable.secondCellOnRow.then(getInnerText).then((lastNames) => {
        const manuallySortedLastNames = sortStringsASC(lastNames);
        expect(lastNames).to.deep.equal(manuallySortedLastNames);
      });
    });

    it('Should sort DESC by Last Name', () => {
      userTable.sortColumnDESC(userTable.lastNameHeaderCell);

      userTable.secondCellOnRow.then(getInnerText).then((lastNames) => {
        const manuallySortedLastNames = sortStringsDESC(lastNames);
        expect(lastNames).to.deep.equal(manuallySortedLastNames);
      });
    });

    it('Should sort ASC by Age', () => {
      userTable.sortColumnASC(userTable.ageHeaderCell);

      userTable.thirdCellOnRow
        .then(getInnerText)
        .then(getNumbers)
        .then((ages) => {
          const manuallySortedAges = sortNumbersASC(ages);
          expect(ages).to.deep.equal(manuallySortedAges);
        });
    });

    it('Should sort DESC by Age', () => {
      userTable.sortColumnDESC(userTable.ageHeaderCell);

      userTable.thirdCellOnRow
        .then(getInnerText)
        .then(getNumbers)
        .then((ages) => {
          const manuallySortedAges = sortNumbersDESC(ages);
          expect(ages).to.deep.equal(manuallySortedAges);
        });
    });

    it('Should sort ASC by Email', () => {
      userTable.sortColumnASC(userTable.emailHeaderCell);

      userTable.fourthCellOnRow.then(getInnerText).then((emails) => {
        const manuallySortedEmails = sortStringsASC(emails);
        expect(emails).to.deep.equal(manuallySortedEmails);
      });
    });

    it('Should sort DESC by Email', () => {
      userTable.sortColumnDESC(userTable.emailHeaderCell);

      userTable.fourthCellOnRow.then(getInnerText).then((emails) => {
        const manuallySortedEmails = sortStringsDESC(emails);
        expect(emails).to.deep.equal(manuallySortedEmails);
      });
    });

    it('Should sort ASC by Salary', () => {
      userTable.sortColumnASC(userTable.salaryHeaderCell);

      userTable.fifthCellOnRow
        .then(getInnerText)
        .then(getNumbers)
        .then((salaries) => {
          const manuallySortedSalaries = sortNumbersASC(salaries);
          expect(salaries).to.deep.equal(manuallySortedSalaries);
        });
    });
    it('Should sort DESC by Salary', () => {
      userTable.sortColumnDESC(userTable.salaryHeaderCell);

      userTable.fifthCellOnRow
        .then(getInnerText)
        .then(getNumbers)
        .then((salaries) => {
          const manuallySortedSalaries = sortNumbersDESC(salaries);
          expect(salaries).to.deep.equal(manuallySortedSalaries);
        });
    });
    it('Should sort ASC by Department', () => {
      userTable.sortColumnASC(userTable.departmentHeaderCell);

      userTable.sixthCellOnRow.then(getInnerText).then((departments) => {
        const manuallySortedDepartments = sortStringsASC(departments);
        expect(departments).to.deep.equal(manuallySortedDepartments);
      });
    });

    it('Should sort DESC by Department', () => {
      userTable.sortColumnDESC(userTable.departmentHeaderCell);

      userTable.sixthCellOnRow.then(getInnerText).then((departments) => {
        const manuallySortedDepartments = sortStringsDESC(departments);
        expect(departments).to.deep.equal(manuallySortedDepartments);
      });
    });
  });
});
