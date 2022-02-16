class SubmitStudentDataForm {
  submittedStudentNameValueSelector = 'table tr:nth-child(1) td:nth-child(2)';

  submittedStudentEmailValueSelector = 'table tr:nth-child(2) td:nth-child(2)';

  submittedStudentGenderValueSelector = 'table tr:nth-child(3) td:nth-child(2)';

  submittedStudentMobileValueSelector = 'table tr:nth-child(4) td:nth-child(2)';

  submittedStudentDateOfBirthValueSelector =
    'table tr:nth-child(5) td:nth-child(2)';

  submittedStudentSubjectValueSelector =
    'table tr:nth-child(6) td:nth-child(2)';

  submittedStudentHobbiesValueSelector =
    'table tr:nth-child(7) td:nth-child(2)';

  submittedStudentPictureValueSelector =
    'table tr:nth-child(8) td:nth-child(2)';

  submittedStudentAddressValueSelector =
    'table tr:nth-child(9) td:nth-child(2)';

  submittedStudentStateAndCityValueSelector =
    'table tr:nth-child(10) td:nth-child(2)';

  get studentNameValue() {
    return cy.get(this.submittedStudentNameValueSelector);
  }

  get studentEmailValue() {
    return cy.get(this.submittedStudentEmailValueSelector);
  }

  get studentGenderValue() {
    return cy.get(this.submittedStudentGenderValueSelector);
  }

  get studentMobileValue() {
    return cy.get(this.submittedStudentMobileValueSelector);
  }

  get studentDateOfBirthValue() {
    return cy.get(this.submittedStudentDateOfBirthValueSelector);
  }

  get studentSubjectValue() {
    return cy.get(this.submittedStudentSubjectValueSelector);
  }

  get studentHobbiesValue() {
    return cy.get(this.submittedStudentHobbiesValueSelector);
  }

  get studentPictureValue() {
    return cy.get(this.submittedStudentPictureValueSelector);
  }

  get studentAddressValue() {
    return cy.get(this.submittedStudentAddressValueSelector);
  }

  get studentStateAndCityValue() {
    return cy.get(this.submittedStudentStateAndCityValueSelector);
  }
}

// eslint-disable-next-line import/prefer-default-export
export { SubmitStudentDataForm };
