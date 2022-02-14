class RegistrationFormPage {
  url = 'https://demoqa.com/automation-practice-form';

  submitButtonSelector = '#submit';

  firstNameInputSelector = '#firstName';

  lastNameInputSelector = '#lastName';

  emailInputSelector = '#userEmail';

  mobileInputSelector = '#userNumber';

  userFormSelector = '#userForm';

  genderSelector = 'input[name="gender"]';

  dateOfBirthDatepickerSelector = '.react-datepicker__input-container';

  dateOfMonthDatepickerSelector = '.react-datepicker__month-select';

  dateOfYearDatepickerSelector = '.react-datepicker__year-select';

  dateOfDayDatepickerSelector =
    '.react-datepicker__day:not(.react-datepicker__day--outside-month)';

  hobbyCheckboxSelector = 'input[type="checkbox"]';

  hobbyLabelsSelector = '.custom-control-label';

  currentAddressSelector = '#currentAddress';

  stateDropdownSelector = '#state';

  dropdownMenuSelector = 'div[class*="menu"]';

  cityDropdownSelector = '#city';

  subjectsDropdownSelector = '#subjectsContainer';

  dropdownSubjectMenuSelector = 'div[id*="option"]';

  subjectLabelsSelector = '.subjects-auto-complete__multi-value__label';

  selectFileInputSelector = '#uploadPicture';

  get submitBtn() {
    return cy.get(this.submitButtonSelector);
  }

  get firstNameInput() {
    return cy.get(this.firstNameInputSelector);
  }

  get lastNameInput() {
    return cy.get(this.lastNameInputSelector);
  }

  get emailInput() {
    return cy.get(this.emailInputSelector);
  }

  get mobileInput() {
    return cy.get(this.mobileInputSelector);
  }

  get userForm() {
    return cy.get(this.userFormSelector);
  }

  get maleGenderRadioButton() {
    return cy.get(this.genderSelector).eq(0);
  }

  get femaleGenderRadioButton() {
    return cy.get(this.genderSelector).eq(1);
  }

  get otherGenderRadioButton() {
    return cy.get(this.genderSelector).eq(2);
  }

  get dateOfBirthDatepicker() {
    return cy.get(this.dateOfBirthDatepickerSelector);
  }

  get dateOfMonthDatepicker() {
    return cy.get(this.dateOfMonthDatepickerSelector);
  }

  get dateOfYearDatepicker() {
    return cy.get(this.dateOfYearDatepickerSelector);
  }

  get dateOfDayDatepicker() {
    return cy.get(this.dateOfDayDatepickerSelector);
  }

  get subjectsDropdown() {
    return cy.get(this.subjectsDropdownSelector);
  }

  get subjectLabels() {
    return cy.get(this.subjectLabelsSelector);
  }

  get sportsHobbyCheckbox() {
    return cy.get(this.hobbyCheckboxSelector).eq(0);
  }

  get readingHobbyCheckbox() {
    return cy.get(this.hobbyCheckboxSelector).eq(1);
  }

  get musicHobbyCheckbox() {
    return cy.get(this.hobbyCheckboxSelector).eq(2);
  }

  get hobbyLabels() {
    return cy.get(this.hobbyLabelsSelector);
  }

  get currentAddress() {
    return cy.get(this.currentAddressSelector);
  }

  get stateDropdown() {
    return cy.get(this.stateDropdownSelector);
  }

  get dropdownMenu() {
    return cy.get(this.dropdownMenuSelector);
  }

  get cityDropdown() {
    return cy.get(this.cityDropdownSelector);
  }

  get dropdownSubjectMenu() {
    return cy.get(this.dropdownSubjectMenuSelector);
  }

  get selectFileInput() {
    return cy.get(this.selectFileInputSelector);
  }

  open() {
    cy.visit(this.url);
  }
}

// eslint-disable-next-line import/prefer-default-export
export { RegistrationFormPage };
