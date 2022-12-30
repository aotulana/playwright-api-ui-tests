import test, { APIRequestContext, expect } from '@playwright/test';
import {
  getBooking,
  getBookingIdsRequest,
  getBookingIds,
} from '../requests/booking';

test.use({
  baseURL: 'https://restful-booker.herokuapp.com',
});

test.describe('Booking: GetBookingIds', () => {
  test('should return all IDs', async ({ request }) => {
    const response = await getBookingIdsRequest(request);
    await expect(response).toBeOK();

    const responseJson = await response.json();
    expect(responseJson.length).toBeGreaterThan(0);
    expect(responseJson[0]).toHaveProperty('bookingid');
  });
});

test.describe('Booking: GetBooking', () => {
  test(`should return booking details`, async ({ request }) => {
    const bookingId = await getBookingIds(request).then(
      (bookingIds) => bookingIds[0].bookingid
    );

    const response = await getBooking(request, bookingId);
    await expect(response).toBeOK();

    const responseJson = await response.json();
    expect(responseJson).toHaveProperty('firstname');
    expect(responseJson).toHaveProperty('lastname');
    expect(responseJson).toHaveProperty('totalprice');
    expect(responseJson).toHaveProperty('bookingdates');
    expect(responseJson).toHaveProperty('bookingdates.checkin');
    expect(responseJson).toHaveProperty('bookingdates.checkout');
  });

  test(`should return 404 Not Found`, async ({ request }) => {
    const bookingId = 0;

    const response = await getBooking(request, bookingId);
    expect(response.status()).toBe(404);
    expect(await response.text()).toBe('Not Found');
  });
});
