import { FC } from 'react';
import { useGetAssetsQuery } from '../../services/coincap';
import './Main.scss';

const Main: FC = () => {
  const { data: assets, isLoading } = useGetAssetsQuery({ limit: 20 });
  return (
    <>
      <div>
        <table className="table">
          <thead>
            <tr className="tr">
              <th colSpan={1}>Rank</th>
              <th colSpan={2}>Name</th>
              <th colSpan={1}>Price</th>
              <th colSpan={1}>Market Cap</th>
              <th colSpan={1}>VWAP (24Hr)</th>
              <th colSpan={1}>Supply</th>
              <th colSpan={1}>Volume (24Hr)</th>
              <th colSpan={1}>Change (24Hr)</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <div>Loading...</div>}
            {!isLoading &&
              assets &&
              assets.data.map(
                ({
                  id,
                  rank,
                  name,
                  symbol,
                  priceUsd,
                  marketCapUsd,
                  vwap24Hr,
                  supply,
                  volumeUsd24Hr,
                  changePercent24Hr,
                }) => {
                  return (
                    <tr key={id} className="tr">
                      <th colSpan={1}>{rank}</th>
                      <th colSpan={2}>{name}</th>
                      <th colSpan={1}>{priceUsd}</th>
                      <th colSpan={1}>{marketCapUsd}</th>
                      <th colSpan={1}>{vwap24Hr}</th>
                      <th colSpan={1}>{supply}</th>
                      <th colSpan={1}>{volumeUsd24Hr}</th>
                      <th colSpan={1}>{changePercent24Hr}</th>
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export { Main };
