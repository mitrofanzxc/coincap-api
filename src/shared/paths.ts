export interface IPATHS {
  main: string;
  currency: string;
  any: string;
}

export const PATHS: IPATHS = {
  main: '/',
  currency: '/:currencyId',
  any: '*',
};
