import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IGetAssetsResponse,
  IGetAssetsRequest,
  IGetAssetResponse,
  IGetAssetRequest,
  IGetAssetHisoryResponse,
  IGetAssetHisoryRequest,
} from './coincap.interface';

export const coinCapApi = createApi({
  reducerPath: 'coinCapApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coincap.io/v2/' }),
  endpoints: (builder) => ({
    getAssets: builder.query<IGetAssetsResponse, IGetAssetsRequest>({
      query: ({ search = '', ids = '', limit = 20, offset = 0 }) =>
        `assets?${limit && `limit=${limit}`}${ids && `&ids=${ids}`}`,
    }),
    getAsset: builder.query<IGetAssetResponse, IGetAssetRequest>({
      query: ({ id = '' }) => `assets/${id && `${id}`}`,
    }),
    getAssetHistory: builder.query<IGetAssetHisoryResponse, IGetAssetHisoryRequest>({
      query: ({ id = '', interval = 'd1' }) =>
        `assets/${id && `${id}`}/history?${interval && `interval=${interval}`}`,
    }),
  }),
});

export const { useGetAssetsQuery, useGetAssetQuery, useGetAssetHistoryQuery } = coinCapApi;
