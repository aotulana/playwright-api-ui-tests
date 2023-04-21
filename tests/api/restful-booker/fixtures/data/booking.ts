import { faker } from '@faker-js/faker';
import { formatDate } from '../../../../utils/formatDate';

const currentDate = new Date();

export const booking = {
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  totalprice: Number(faker.random.numeric(3)),
  depositpaid: true,
  bookingdates: {
    checkin: formatDate(currentDate),
    checkout: formatDate(
      new Date(currentDate.setDate(currentDate.getDate() + 1)) // next day
    ),
  },
  additionalneeds: 'Breakfast',
};
