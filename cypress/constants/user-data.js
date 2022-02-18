// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';

const randomDate = faker.date.past(5, new Date('December 17, 2002'));
const FAKE_FULL_NAME = faker.name.findName();
const FAKE_FIRST_NAME = faker.name.firstName();
const FAKE_LAST_NAME = faker.name.lastName();
const FAKE_EMAIL = faker.internet.email();
const AGE = faker.random.number({ min: 0, max: 100, precision: 1 });
const FAKE_MOBILE = faker.phone.phoneNumber('##########');
const SALARY_DOLLARS = faker.random.number({
  min: 400,
  max: 100000,
  precision: 1,
});
const FAKE_DAY = randomDate.getDate().toString();
const FAKE_MONTH = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
  randomDate,
);
const FAKE_YEAR = randomDate.getFullYear().toString();
const FAKE_CURRENT_ADDRESS = faker.address.streetAddress();
const FAKE_SECONDARY_ADDRESS = faker.address.secondaryAddress();
const DEPARTMENT = faker.commerce.department();
const RANDOM_NUMBER = faker.random.number({ min: 1, max: 100, precision: 1 });

const randomUserData = {
  FAKE_FULL_NAME,
  FAKE_FIRST_NAME,
  FAKE_LAST_NAME,
  FAKE_EMAIL,
  AGE,
  FAKE_MOBILE,
  SALARY_DOLLARS,
  FAKE_CURRENT_ADDRESS,
  FAKE_SECONDARY_ADDRESS,
  FAKE_DAY,
  FAKE_MONTH,
  FAKE_YEAR,
  DEPARTMENT,
  RANDOM_NUMBER,
};

// eslint-disable-next-line import/prefer-default-export
export { randomUserData };
