import { APIRequestContext } from '@playwright/test';

export const getBookingIdsRequest = async (request: APIRequestContext) => {
  return await request.get('/booking');
};

export const getBookingIds = async (request: APIRequestContext) => {
  return await getBookingIdsRequest(request).then(
    async (response) => await response.json()
  );
};

export const getBooking = async (request: APIRequestContext, id: number) => {
  return await request.get(`/booking/${id}`);
};
