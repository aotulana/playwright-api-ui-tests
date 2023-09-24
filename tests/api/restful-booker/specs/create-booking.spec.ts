import { expect, test } from '@playwright/test';
import { booking } from '../fixtures/data/booking';
import { createBooking } from '../requests/booking';

test.describe('Booking: CreateBooking', () => {
  test('should return new booking with bookingid', async ({ request }) => {
    const response = await createBooking(request, booking);
    await expect(response).toBeOK();

    const responseJson = await response.json();
    expect(responseJson).toHaveProperty('bookingid');
    expect(responseJson.booking).toStrictEqual(booking);
  });
});
