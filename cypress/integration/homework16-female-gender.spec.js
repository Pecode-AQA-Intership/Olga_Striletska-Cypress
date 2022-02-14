import 'cypress-file-upload';
import { RegistrationFormPage } from '../page-objects/student-registration-form';
import { SubmitStudentDataForm } from '../page-objects/submit-student-data-modal';

import {
  randomUserData,
  GENDER,
  SUBJECT,
  HOBBIES,
  STATES,
  UTTAR_PRADESH_STATE_CITIES,
} from '../constants/user-data';

describe('Lesson16', () => {
  describe('Female Gender Flow', () => {
    let registrationFormPage;
    let submitStudentDataForm;

    before(() => {
      registrationFormPage = new RegistrationFormPage();
      registrationFormPage.open();

      submitStudentDataForm = new SubmitStudentDataForm();
    });
    it('Should open Student Registration Form page', () => {
      registrationFormPage.userForm.should('exist');
    });

    it('Should fill First Name input', () => {
      registrationFormPage.firstNameInput
        .type(randomUserData.FAKE_FIRST_NAME)
        .should('have.value', randomUserData.FAKE_FIRST_NAME);
    });

    it('Should fill Last Name input', () => {
      registrationFormPage.lastNameInput
        .type(randomUserData.FAKE_LAST_NAME)
        .should('have.value', randomUserData.FAKE_LAST_NAME);
    });

    it('Should fill Email input', () => {
      registrationFormPage.emailInput
        .type(randomUserData.FAKE_EMAIL)
        .should('have.value', randomUserData.FAKE_EMAIL);
    });
    it('Should mark Female gender radio button', () => {
      registrationFormPage.femaleGenderRadioButton.click({ force: true });
      registrationFormPage.femaleGenderRadioButton.should('be.checked');
    });

    it('Should fill Mobile input', () => {
      registrationFormPage.mobileInput
        .type(randomUserData.FAKE_MOBILE)
        .should('have.value', randomUserData.FAKE_MOBILE);
    });
    it('Should fill DatePicker input', () => {
      registrationFormPage.dateOfBirthDatepicker.click();

      registrationFormPage.dateOfMonthDatepicker.select(
        randomUserData.FAKE_MONTH,
      );
      registrationFormPage.dateOfYearDatepicker.select(
        randomUserData.FAKE_YEAR,
      );
      registrationFormPage.dateOfDayDatepicker
        .contains(randomUserData.FAKE_DAY)
        .click();
    });

    it('Should select value from Subjects dropdown', () => {
      registrationFormPage.subjectsDropdown.click();
      registrationFormPage.subjectsDropdown.type(SUBJECT.accounting);
      registrationFormPage.dropdownSubjectMenu
        .contains(SUBJECT.accounting)
        .click();
      registrationFormPage.subjectLabels
        .contains(SUBJECT.accounting)
        .should('exist');
    });

    it('Should check Hobbies checkbox', () => {
      registrationFormPage.musicHobbyCheckbox.click({ force: true });
      registrationFormPage.hobbyLabels.contains(HOBBIES.music).should('exist');
    });

    it('Should download the picture', () => {
      const fixtureFolderPath = Cypress.config('fixturesFolder');
      registrationFormPage.selectFileInput.selectFile(
        `${fixtureFolderPath}/sunset.jpg`,
      );
    });

    it('Should fill Current Address field', () => {
      registrationFormPage.currentAddress
        .type(randomUserData.FAKE_CURRENT_ADDRESS)
        .should('have.value', randomUserData.FAKE_CURRENT_ADDRESS);
    });
    it('Should select value from State dropdown', () => {
      registrationFormPage.stateDropdown.click();
      registrationFormPage.dropdownMenu.contains(STATES.uttarPradesh).click();
    });
    it('Should select value from City dropdown', () => {
      registrationFormPage.cityDropdown.click();
      registrationFormPage.dropdownMenu
        .contains(UTTAR_PRADESH_STATE_CITIES.agra)
        .click();
    });

    it('Should submit form', () => {
      registrationFormPage.submitBtn.click();
    });

    it('Should have correct User Data in submit user data modal', () => {
      submitStudentDataForm.studentNameValue.contains(
        `${randomUserData.FAKE_FIRST_NAME} ${randomUserData.FAKE_LAST_NAME}`,
      );
      submitStudentDataForm.studentEmailValue.contains(
        randomUserData.FAKE_EMAIL,
      );
      submitStudentDataForm.studentGenderValue.contains(GENDER.female);
      submitStudentDataForm.studentMobileValue.contains(
        randomUserData.FAKE_MOBILE,
      );
      submitStudentDataForm.studentDateOfBirthValue.contains(
        `${randomUserData.FAKE_DAY} ${randomUserData.FAKE_MONTH},${randomUserData.FAKE_YEAR}`,
      );
      submitStudentDataForm.studentSubjectValue.contains(SUBJECT.accounting);
      submitStudentDataForm.studentHobbiesValue.contains(HOBBIES.music);
      submitStudentDataForm.studentPictureValue.contains('sunset.jpg');
      submitStudentDataForm.studentAddressValue.contains(
        randomUserData.FAKE_CURRENT_ADDRESS,
      );
      submitStudentDataForm.studentStateAndCityValue.contains(
        `${STATES.uttarPradesh} ${UTTAR_PRADESH_STATE_CITIES.agra}`,
      );
    });
  });
});
