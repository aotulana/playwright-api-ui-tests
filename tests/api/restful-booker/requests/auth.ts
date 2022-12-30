import { APIRequestContext } from '@playwright/test';

export const postAuthRequest = async (request: APIRequestContext, data: {}) => {
  return await request.post('/auth', {
    data,
  });
};
