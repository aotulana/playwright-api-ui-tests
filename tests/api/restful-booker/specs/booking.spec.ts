import test, { APIResponse, expect } from '@playwright/test';
import { user } from '../fixtures/data/user';
import { booking } from '../fixtures/data/booking';
import { postAuthRequest } from '../requests/auth';
import {
  getBooking,
  getBookingIdsRequest,
  getBookingIds,
  createBooking,
  updateBooking,
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
  test('should return booking details when booking ID is valid', async ({
    request,
  }) => {
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

  test('should return 404 Not Found when booking ID is invalid', async ({
    request,
  }) => {
    const bookingId = 0;

    const response = await getBooking(request, bookingId);
    expect(response.status()).toBe(404);
    expect(await response.text()).toBe('Not Found');
  });
});

test.describe('Booking: CreateBooking', () => {
  test('should return new booking with bookingid', async ({ request }) => {
    const response = await createBooking(request, booking);
    await expect(response).toBeOK();

    const responseJson = await response.json();
    expect(responseJson).toHaveProperty('bookingid');
    expect(responseJson.booking).toStrictEqual(booking);
  });
});

test.describe('Booking: UpdateBooking', () => {
  let token: string;
  let bookingId: number;
  let response: APIResponse;
  let responseJson: any;

  test.beforeAll(async ({ request }) => {
    bookingId = await getBookingIds(request).then(
      (bookingIds) => bookingIds[0].bookingid
    );
  });

  test('should return forbidden when no token is provided', async ({
    request,
  }) => {
    response = await updateBooking(request, {}, bookingId, booking);
    await expect(response).not.toBeOK();
    expect(await response.text()).toEqual('Forbidden');
  });

  test('should return updated booking details', async ({ request }) => {
    // Get token
    response = await postAuthRequest(request, user);
    await expect(response).toBeOK();

    responseJson = await response.json();
    token = responseJson.token;

    const extraHTTPHeaders = {
      Cookie: `token=${token}`,
    };

    // Update booking with token
    response = await updateBooking(
      request,
      extraHTTPHeaders,
      bookingId,
      booking
    );
    await expect(response).toBeOK();

    responseJson = await response.json();
    expect(responseJson).toStrictEqual(booking);
  });
});
