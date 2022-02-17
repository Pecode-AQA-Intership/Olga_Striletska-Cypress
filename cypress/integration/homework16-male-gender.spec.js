import 'cypress-file-upload';
import { RegistrationFormPage } from '../page-objects/student-registration-form';
import { SubmitStudentDataForm } from '../page-objects/submit-student-data-modal';

import { randomUserData } from '../constants/user-data';

import { GENDER } from '../constants/gender';

import { SUBJECT, HOBBIES } from '../constants/interests';

import { STATES, NCR_STATE_CITIES } from '../constants/places';

describe('Lesson16', () => {
  context('Male Gender Flow', () => {
    const registrationFormPage = new RegistrationFormPage();
    const submitStudentDataForm = new SubmitStudentDataForm();

    before(() => {
      registrationFormPage.open();
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

    it('Should mark Male gender radio button', () => {
      registrationFormPage.maleGenderRadioButton.click({ force: true });
      registrationFormPage.maleGenderRadioButton.should('be.checked');
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
      registrationFormPage.subjectsDropdown.type(SUBJECT.maths);
      registrationFormPage.dropdownSubjectMenu.contains(SUBJECT.maths).click();
      registrationFormPage.subjectLabels
        .contains(SUBJECT.maths)
        .should('exist');
    });

    it('Should check Hobbies checkbox', () => {
      registrationFormPage.readingHobbyCheckbox.click({ force: true });
      registrationFormPage.hobbyLabels
        .contains(HOBBIES.reading)
        .should('exist');
    });

    it('Should upload the picture', () => {
      registrationFormPage.uploadFile('sunset.jpg');
    });

    it('Should fill Current Address field', () => {
      registrationFormPage.currentAddress
        .type(randomUserData.FAKE_CURRENT_ADDRESS)
        .should('have.value', randomUserData.FAKE_CURRENT_ADDRESS);
    });

    it('Should select value from State dropdown', () => {
      registrationFormPage.stateDropdown.click();
      registrationFormPage.dropdownMenu.contains(STATES.ncr).click();
    });

    it('Should select value from City dropdown', () => {
      registrationFormPage.cityDropdown.click();
      registrationFormPage.dropdownMenu
        .contains(NCR_STATE_CITIES.delhi)
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
      submitStudentDataForm.studentGenderValue.contains(GENDER.male);
      submitStudentDataForm.studentMobileValue.contains(
        randomUserData.FAKE_MOBILE,
      );
      submitStudentDataForm.studentDateOfBirthValue.contains(
        `${randomUserData.FAKE_DAY} ${randomUserData.FAKE_MONTH},${randomUserData.FAKE_YEAR}`,
      );
      submitStudentDataForm.studentSubjectValue.contains(SUBJECT.maths);
      submitStudentDataForm.studentHobbiesValue.contains(HOBBIES.reading);
      submitStudentDataForm.studentPictureValue.contains('sunset.jpg');
      submitStudentDataForm.studentAddressValue.contains(
        randomUserData.FAKE_CURRENT_ADDRESS,
      );
      submitStudentDataForm.studentStateAndCityValue.contains(
        `${STATES.ncr} ${NCR_STATE_CITIES.delhi}`,
      );
    });
  });
});
