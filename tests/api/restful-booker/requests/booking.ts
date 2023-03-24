import { APIRequestContext } from '@playwright/test';

const BOOKING_ENDPOINT_BASE_PATH = '/booking';

export const getBookingIdsRequest = async (request: APIRequestContext) => {
  return await request.get(BOOKING_ENDPOINT_BASE_PATH);
};

export const getBookingIds = async (request: APIRequestContext) => {
  return await getBookingIdsRequest(request).then(
    async (response) => await response.json()
  );
};

export const getBooking = async (request: APIRequestContext, id: number) => {
  return await request.get(`${BOOKING_ENDPOINT_BASE_PATH}/${id}`);
};

export const createBooking = async (
  request: APIRequestContext,
  data: object
) => {
  return await request.post(BOOKING_ENDPOINT_BASE_PATH, { data });
};
