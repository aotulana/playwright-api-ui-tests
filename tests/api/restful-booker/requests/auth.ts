import { APIRequestContext } from '@playwright/test';

export const postAuthRequest = async (
  request: APIRequestContext,
  data: object
) => {
  return await request.post('/auth', {
    data,
  });
};
