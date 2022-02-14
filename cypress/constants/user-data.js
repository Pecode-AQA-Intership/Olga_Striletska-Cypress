import { faker } from '@faker-js/faker';

const GENDER = {
  male: 'Male',
  female: 'Female',
  other: 'Other',
};

const SUBJECT = {
  maths: 'Maths',
  accounting: 'Accounting',
  arts: 'Arts',
  biology: 'Biology',
  computerScience: 'Computer Science',
  hindi: 'Hindi',
  commerce: 'Commerce',
  history: 'History',
};
const HOBBIES = {
  sports: 'Sports',
  reading: 'Reading',
  music: 'Music',
};

const STATES = {
  ncr: 'NCR',
  uttarPradesh: 'Uttar Pradesh',
  haryana: 'Haryana',
};

const NCR_STATE_CITIES = {
  delhi: 'Delhi',
  gurgaon: 'Gurgaon',
  noida: 'Noida',
};

const UTTAR_PRADESH_STATE_CITIES = {
  agra: 'Agra',
  lucknow: 'Lucknow',
  merrut: 'Merrut',
};

const HARYANA_STATE_CITIES = {
  karnal: 'Karnal',
  panipat: 'Panipat',
};

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

export {
  randomUserData,
  GENDER,
  SUBJECT,
  HOBBIES,
  STATES,
  NCR_STATE_CITIES,
  UTTAR_PRADESH_STATE_CITIES,
  HARYANA_STATE_CITIES,
};
