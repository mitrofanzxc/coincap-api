export interface IAssets {
  id?: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply?: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
}

export interface IGetAssetsResponse {
  data: IAssets[];
  timestamp: number;
}

export interface IGetAssetsRequest {
  search?: string;
  ids?: string;
  limit?: number;
  offset?: number;
}

export interface IGetAssetResponse {
  data: IAssets;
  timestamp: number;
}

export interface IGetAssetRequest {
  id?: string;
}

export interface IHistory {
  date: string;
  priceUsd: string;
  time: number;
}

export interface IGetAssetHisoryResponse {
  data: IHistory[];
  timestamp: number;
}

export interface IGetAssetHisoryRequest {
  id?: string;
  interval?: string;
}
