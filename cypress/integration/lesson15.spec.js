import { faker } from '@faker-js/faker';
import { getInnerText, getNumbers } from '../../utilities/data';
import {
  sortNumbersASC,
  sortStringsASC,
  sortNumbersDESC,
  sortStringsDESC,
} from '../../utilities/sorting';

const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const email = faker.internet.email();
const age = faker.random.number({ min: 0, max: 100, precision: 1 });
const salaryDollars = faker.random.number({
  min: 400,
  max: 100000,
  precision: 1,
});
const department = faker.lorem.words(1);
const randomNumber = faker.random.number({ min: 1, max: 100, precision: 1 });

describe('Lesson15', () => {
  const firstUserCellsSelector =
    '.rt-table .rt-tr-group:first-child .rt-tr .rt-td';
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
  });

  describe('User creating', () => {
    it('Should open registration form', () => {
      // arrange
      // act
      cy.get('#addNewRecordButton').click();
      // assert
      cy.get('.modal-dialog').should('exist');
    });

    it('Should not create new user if modal closed', () => {
      // arrange
      cy.get('#addNewRecordButton').click();
      cy.get('#firstName').type(firstName);
      cy.get('#lastName').type(lastName);
      cy.get('#userEmail').type(email);
      cy.get('#age').type(999);
      cy.get('#salary').type(999999);
      cy.get('#department').type(department);
      // act
      cy.get('.modal-header .close').click();
      // assert
      cy.contains(firstName).should('not.exist');
      cy.contains(lastName).should('not.exist');
      cy.contains(email).should('not.exist');
      cy.contains(999).should('not.exist');
      cy.contains(999999).should('not.exist');
      cy.contains(department).should('not.exist');
    });

    it('Should not close modal if no data entered', () => {
      // arrange
      cy.get('#addNewRecordButton').click();
      // act
      cy.get('.modal-content #submit').click();
      // assert
      cy.get('.modal-dialog').should('be.visible');
    });

    it('Should apply errors styling to fields with no data', () => {
      // arrange
      cy.get('#addNewRecordButton').click();
      // act
      cy.get('.modal-content #submit').click();
      // assert
      cy.get('#firstName').should(
        'have.css',
        'border-color',
        'rgb(220, 53, 69)',
      );
      cy.get('#lastName').should(
        'have.css',
        'border-color',
        'rgb(220, 53, 69)',
      );
      cy.get('#userEmail').should(
        'have.css',
        'border-color',
        'rgb(220, 53, 69)',
      );
      cy.get('#age').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      cy.get('#salary').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      cy.get('#department').should(
        'have.css',
        'border-color',
        'rgb(220, 53, 69)',
      );
    });
    it('Should create new user', () => {
      // arrange
      cy.get('#addNewRecordButton').click();
      cy.get('#firstName').type(firstName);
      cy.get('#lastName').type(lastName);
      cy.get('#userEmail').type(email);
      cy.get('#age').type(age);
      cy.get('#salary').type(salaryDollars);
      cy.get('#department').type(department);
      // act
      cy.get('.modal-content #submit').click();
      // assert
      cy.contains(firstName).should('exist');
      cy.contains(lastName).should('exist');
      cy.contains(email).should('exist');
      cy.contains(age).should('exist');
      cy.contains(salaryDollars).should('exist');
      cy.contains(department).should('exist');
    });
  });

  describe('User editing', () => {
    it('Should have User record edit button', () => {
      // assert
      cy.get('#edit-record-1').should('exist');
    });
    it('Should open edit modal on user edit button click', () => {
      // arrange
      cy.get(firstUserCellsSelector);
      // act
      cy.get('#edit-record-1').click();
      // assert
      cy.get('.modal-dialog').should('exist');
    });

    it('Should be able to edit each field in the modal', () => {
      // arrange
      cy.get('#edit-record-1').click();
      // act
      cy.get('#firstName').clear().type(firstName);
      cy.get('#lastName').clear().type(lastName);
      cy.get('#userEmail').clear().type(email);
      cy.get('#age').clear().type(age);
      cy.get('#salary').clear().type(salaryDollars);
      cy.get('#department').clear().type(department);
      // assert
      cy.get('#firstName').should('have.value', firstName);
      cy.get('#lastName').should('have.value', lastName);
      cy.get('#userEmail').should('have.value', email);
      cy.get('#age').should('have.value', age);
      cy.get('#salary').should('have.value', salaryDollars);
      cy.get('#department').should('have.value', department);
    });

    it('Should have user data pre-filled in the modal', () => {
      // arrange
      cy.get(firstUserCellsSelector).then((cells) => {
        const currentFirstName = cells.get(0).innerText;
        const currentLastName = cells.get(1).innerText;
        const currentAge = cells.get(2).innerText;
        const currentEmail = cells.get(3).innerText;
        const currentSalary = cells.get(4).innerText;
        const currentDepartment = cells.get(5).innerText;
        // act
        cy.get('#edit-record-1').click();
        // assert
        cy.get('#firstName').should('have.value', currentFirstName);
        cy.get('#lastName').should('have.value', currentLastName);
        cy.get('#userEmail').should('have.value', currentEmail);
        cy.get('#age').should('have.value', currentAge);
        cy.get('#salary').should('have.value', currentSalary);
        cy.get('#department').should('have.value', currentDepartment);
      });
    });
    it('Should edit existing user', () => {
      // arrange
      cy.get(firstUserCellsSelector).eq(0).contains('Cierra').should('exist');
      cy.get(firstUserCellsSelector).eq(1).contains('Vega').should('exist');
      cy.get(firstUserCellsSelector).eq(2).contains('39').should('exist');
      cy.get(firstUserCellsSelector)
        .eq(3)
        .contains('cierra@example.com')
        .should('exist');
      cy.get(firstUserCellsSelector).eq(4).contains('10000').should('exist');
      cy.get(firstUserCellsSelector)
        .eq(5)
        .contains('Insurance')
        .should('exist');

      // act
      cy.get('#edit-record-1').click();
      cy.get('#firstName').clear().type(firstName);
      cy.get('#lastName').clear().type(lastName);
      cy.get('#userEmail').clear().type(email);
      cy.get('#age').clear().type(age);
      cy.get('#salary').clear().type(salaryDollars);
      cy.get('#department').clear().type(department);
      cy.get('.modal-content #submit').click();

      // assert
      cy.get(firstUserCellsSelector).eq(0).contains(firstName).should('exist');
      cy.get(firstUserCellsSelector).eq(1).contains(lastName).should('exist');
      cy.get(firstUserCellsSelector).eq(2).contains(age).should('exist');
      cy.get(firstUserCellsSelector).eq(3).contains(email).should('exist');
      cy.get(firstUserCellsSelector)
        .eq(4)
        .contains(salaryDollars)
        .should('exist');
      cy.get(firstUserCellsSelector).eq(5).contains(department).should('exist');
    });
    it('Should not close modal if edit invalid data in email field', () => {
      // arrange
      cy.get(firstUserCellsSelector);
      cy.get(firstUserCellsSelector).eq(0).contains('Cierra').should('exist');
      cy.get(firstUserCellsSelector).eq(1).contains('Vega').should('exist');
      cy.get(firstUserCellsSelector).eq(2).contains('39').should('exist');
      cy.get(firstUserCellsSelector)
        .eq(3)
        .contains('cierra@example.com')
        .should('exist');
      cy.get(firstUserCellsSelector).eq(4).contains('10000').should('exist');
      cy.get(firstUserCellsSelector)
        .eq(5)
        .contains('Insurance')
        .should('exist');

      // act
      cy.get('#edit-record-1').click();
      cy.get('#userEmail').type(randomNumber);
      cy.get('.modal-content #submit').click();

      // assert
      cy.get('#userEmail').should(
        'have.css',
        'border-color',
        'rgb(220, 53, 69)',
      );
    });
  });

  describe('User deleting', () => {
    it('Should have User record delete button', () => {
      // assert
      cy.get('#delete-record-1').should('exist');
    });
    it('Should delete User on delete user button click', () => {
      // TODO: refactor promises
      // assert
      cy.get(firstUserCellsSelector).then((oldCells) => {
        const oldFirstName = oldCells.get(0).innerText;
        const oldLastName = oldCells.get(1).innerText;
        const oldAge = oldCells.get(2).innerText;
        const oldEmail = oldCells.get(3).innerText;
        const oldSalary = oldCells.get(4).innerText;
        const oldDepartment = oldCells.get(5).innerText;

        // act
        cy.get('#delete-record-1').click();

        // assert
        cy.get(firstUserCellsSelector).then((newCells) => {
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

  describe('User searching', () => {
    it('Should have search field visible', () => {
      // assert
      cy.get('#searchBox').should('exist');
    });
    it('Should have correct search field placeholder', () => {
      // assert
      cy.get('#searchBox').should('have.attr', 'placeholder', 'Type to search');
    });
    it('Should start search on data input', () => {
      // arrange
      cy.get('#searchBox').as('searchUserInput');

      // act
      cy.get('@searchUserInput').click();
      cy.get('@searchUserInput').type('This is the fake text');
      // assert

      cy.get('.rt-td').each((cell) => {
        expect(cell.text().trim()).equal('');
      });
    });
    it('Should find User by First name', () => {
      // act
      cy.get('#searchBox').type('Cierra');

      // assert
      cy.get(firstUserCellsSelector).then((cells) => {
        expect(cells.get(0).innerText).equal('Cierra');
      });
    });
    it('Should find User by Last name', () => {
      // act
      cy.get('#searchBox').type('Vega');

      // assert
      cy.get(firstUserCellsSelector).then((cells) => {
        expect(cells.get(1).innerText).equal('Vega');
      });
    });
    it('Should find User by Age', () => {
      // act
      cy.get('#searchBox').type('39');

      // assert
      cy.get(firstUserCellsSelector).then((cells) => {
        expect(cells.get(2).innerText).equal('39');
      });
    });
    it('Should find User by Email', () => {
      // act
      cy.get('#searchBox').type('cierra@example.com');

      // assert
      cy.get(firstUserCellsSelector).then((cells) => {
        expect(cells.get(3).innerText).equal('cierra@example.com');
      });
    });
    it('Should find User by Salary', () => {
      // act
      cy.get('#searchBox').type('10000');

      // assert
      cy.get(firstUserCellsSelector).then((cells) => {
        expect(cells.get(4).innerText).equal('10000');
      });
    });
    it('Should find User by Department', () => {
      // act
      cy.get('#searchBox').type('Insurance');

      // assert
      cy.get(firstUserCellsSelector).then((cells) => {
        expect(cells.get(5).innerText).equal('Insurance');
      });
    });
  });

  describe('User sorting', () => {
    it('Should sort ASC by First Name', () => {
      cy.get('.rt-th:nth-child(1)').click();
      cy.get('.rt-th:nth-child(1)').should('have.class', '-sort-asc');

      cy.get('.rt-tr-group .rt-td:nth-child(1)')
        .then(getInnerText)
        .then((firstNames) => {
          const manuallySortedFirstNames = sortStringsASC(firstNames);
          expect(firstNames).to.deep.equal(manuallySortedFirstNames);
        });
    });

    it('Should sort DESC by First Name', () => {
      cy.get('.rt-th:nth-child(1)').dblclick();
      cy.get('.rt-th:nth-child(1)').should('have.class', '-sort-desc');

      cy.get('.rt-tr-group .rt-td:nth-child(1)')
        .then(getInnerText)
        .then((firstNames) => {
          const manuallySortedFirstNames = sortStringsDESC(firstNames);
          expect(firstNames).to.deep.equal(manuallySortedFirstNames);
        });
    });

    it('Should sort ASC by Last Name', () => {
      cy.get('.rt-th:nth-child(2)').click();
      cy.get('.rt-th:nth-child(2)').should('have.class', '-sort-asc');

      cy.get('.rt-tr-group .rt-td:nth-child(2)')
        .then(getInnerText)
        .then((lastNames) => {
          const manuallySortedLastNames = sortStringsASC(lastNames);
          expect(lastNames).to.deep.equal(manuallySortedLastNames);
        });
    });

    it('Should sort DESC by Last Name', () => {
      cy.get('.rt-th:nth-child(2)').dblclick();
      cy.get('.rt-th:nth-child(2)').should('have.class', '-sort-desc');

      cy.get('.rt-tr-group .rt-td:nth-child(2)')
        .then(getInnerText)
        .then((lastNames) => {
          const manuallySortedLastNames = sortStringsDESC(lastNames);
          expect(lastNames).to.deep.equal(manuallySortedLastNames);
        });
    });

    it('Should sort ASC by Age', () => {
      cy.get('.rt-th:nth-child(3)').click();
      cy.get('.rt-th:nth-child(3)').should('have.class', '-sort-asc');

      cy.get('.rt-tr-group .rt-td:nth-child(3)')
        .then(getInnerText)
        .then(getNumbers)
        .then((ages) => {
          const manuallySortedAges = sortNumbersASC(ages);
          expect(ages).to.deep.equal(manuallySortedAges);
        });
    });

    it('Should sort DESC by Age', () => {
      cy.get('.rt-th:nth-child(3)').dblclick();
      cy.get('.rt-th:nth-child(3)').should('have.class', '-sort-desc');

      cy.get('.rt-tr-group .rt-td:nth-child(3)')
        .then(getInnerText)
        .then(getNumbers)
        .then((ages) => {
          const manuallySortedAges = sortNumbersDESC(ages);
          expect(ages).to.deep.equal(manuallySortedAges);
        });
    });

    it('Should sort ASC by Email', () => {
      cy.get('.rt-th:nth-child(4)').click();
      cy.get('.rt-th:nth-child(4)').should('have.class', '-sort-asc');

      cy.get('.rt-tr-group .rt-td:nth-child(4)')
        .then(getInnerText)
        .then((emails) => {
          const manuallySortedEmails = sortStringsASC(emails);
          expect(emails).to.deep.equal(manuallySortedEmails);
        });
    });

    it('Should sort DESC by Email', () => {
      cy.get('.rt-th:nth-child(4)').dblclick();
      cy.get('.rt-th:nth-child(4)').should('have.class', '-sort-desc');

      cy.get('.rt-tr-group .rt-td:nth-child(4)')
        .then(getInnerText)
        .then((emails) => {
          const manuallySortedEmails = sortStringsDESC(emails);
          expect(emails).to.deep.equal(manuallySortedEmails);
        });
    });

    it('Should sort ASC by Salary', () => {
      cy.get('.rt-th:nth-child(5)').click();
      cy.get('.rt-th:nth-child(5)').should('have.class', '-sort-asc');

      cy.get('.rt-tr-group .rt-td:nth-child(5)')
        .then(getInnerText)
        .then(getNumbers)
        .then((salaries) => {
          const manuallySortedSalaries = sortNumbersASC(salaries);
          expect(salaries).to.deep.equal(manuallySortedSalaries);
        });
    });
    it('Should sort DESC by Salary', () => {
      cy.get('.rt-th:nth-child(5)').dblclick();
      cy.get('.rt-th:nth-child(5)').should('have.class', '-sort-desc');

      cy.get('.rt-tr-group .rt-td:nth-child(5)')
        .then(getInnerText)
        .then(getNumbers)
        .then((salaries) => {
          const manuallySortedSalaries = sortNumbersDESC(salaries);
          expect(salaries).to.deep.equal(manuallySortedSalaries);
        });
    });
    it('Should sort ASC by Department', () => {
      cy.get('.rt-th:nth-child(6)').click();
      cy.get('.rt-th:nth-child(6)').should('have.class', '-sort-asc');

      cy.get('.rt-tr-group .rt-td:nth-child(6)')
        .then(getInnerText)
        .then((departments) => {
          const manuallySortedDepartments = sortStringsASC(departments);
          expect(departments).to.deep.equal(manuallySortedDepartments);
        });
    });

    it('Should sort DESC by Department', () => {
      cy.get('.rt-th:nth-child(6)').dblclick();
      cy.get('.rt-th:nth-child(6)').should('have.class', '-sort-desc');

      cy.get('.rt-tr-group .rt-td:nth-child(6)')
        .then(getInnerText)
        .then((departments) => {
          const manuallySortedDepartments = sortStringsDESC(departments);
          expect(departments).to.deep.equal(manuallySortedDepartments);
        });
    });
  });
});
