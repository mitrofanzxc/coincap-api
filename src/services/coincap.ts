import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGetAssetsResponse, IGetAssetsRequest } from './coincap.interface';

export const coinCapApi = createApi({
  reducerPath: 'coinCapApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coincap.io/v2/' }),
  endpoints: (builder) => ({
    getAssets: builder.query<IGetAssetsResponse, IGetAssetsRequest>({
      query: ({ search = '', ids = '', limit = 20, offset = 0 }) =>
        `assets?${limit && `limit=${limit}`}`,
    }),
  }),
});

export const { useGetAssetsQuery } = coinCapApi;
