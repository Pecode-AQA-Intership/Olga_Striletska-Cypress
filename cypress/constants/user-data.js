// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';

const randomDate = faker.date.past(5, new Date('December 17, 2002'));
const FAKE_FIRST_NAME = faker.name.firstName();
const FAKE_LAST_NAME = faker.name.lastName();
const FAKE_EMAIL = faker.internet.email();
const FAKE_MOBILE = faker.phone.phoneNumber('##########');
const FAKE_DAY = randomDate.getDate().toString();
const FAKE_MONTH = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
  randomDate,
);
const FAKE_YEAR = randomDate.getFullYear().toString();
const FAKE_CURRENT_ADDRESS = faker.address.streetAddress();

const randomUserData = {
  FAKE_FIRST_NAME,
  FAKE_LAST_NAME,
  FAKE_EMAIL,
  FAKE_MOBILE,
  FAKE_CURRENT_ADDRESS,
  FAKE_DAY,
  FAKE_MONTH,
  FAKE_YEAR,
};

// eslint-disable-next-line import/prefer-default-export
export { randomUserData };
