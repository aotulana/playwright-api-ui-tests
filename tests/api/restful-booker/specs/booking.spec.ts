import { APIResponse, expect, test } from '@playwright/test';
import { user } from '../fixtures/data/user';
import { booking } from '../fixtures/data/booking';
import { postAuthRequest } from '../requests/auth';
import {
  getBookingIds,
  createBooking,
  updateBooking,
} from '../requests/booking';

test.describe('Booking: CreateBooking', () => {
  test('should return new booking with bookingid', async ({ request }) => {
    const response = await createBooking(request, booking);
    await expect(response).toBeOK();

    const responseJson = await response.json();
    expect(responseJson).toHaveProperty('bookingid');
    expect(responseJson.booking).toStrictEqual(booking);
  });
});

test.describe('Booking', () => {
  let token: string;
  let bookingId: number;
  let response: APIResponse;
  let responseJson: any;
  let extraHTTPHeaders: { [key: string]: string };

  test.beforeAll(async ({ request }) => {
    response = await postAuthRequest(request, user);
    await expect(response).toBeOK();

    responseJson = await response.json();
    token = responseJson.token;

    extraHTTPHeaders = {
      Cookie: `token=${token}`,
    };
  });

  test.describe('UpdateBooking', () => {
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

  test.describe('PartialUpdateBooking', () => {
    test.beforeAll(async ({ request }) => {
      bookingId = await getBookingIds(request).then(
        (bookingIds) => bookingIds[0].bookingid
      );
    });

    test('should return forbidden when no token is provided', async ({
      request,
    }) => {
      response = await updateBooking(request, {}, bookingId, booking, true);
      await expect(response).not.toBeOK();
      expect(await response.text()).toEqual('Forbidden');
    });

    test('should return partially updated booking details', async ({
      request,
    }) => {
      const partialBooking = {
        firstname: booking.firstname,
        lastname: booking.lastname,
      };

      response = await updateBooking(
        request,
        extraHTTPHeaders,
        bookingId,
        partialBooking,
        true
      );
      await expect(response).toBeOK();

      responseJson = await response.json();
      expect(responseJson).toHaveProperty(
        'firstname',
        partialBooking.firstname
      );
      expect(responseJson).toHaveProperty('lastname', partialBooking.lastname);
    });
  });
});
