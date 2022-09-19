import { FC } from 'react';
import { useGetAssetsQuery } from '../../services/coincap';
import { TableRow } from '../../components';
import './Main.scss';

const Main: FC = () => {
  const { data: assets, isLoading } = useGetAssetsQuery({ limit: 20 });

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th colSpan={1}>Rank</th>
            <th colSpan={1}>Name</th>
            <th colSpan={1}>Price</th>
            <th colSpan={1}>Market Cap</th>
            <th colSpan={1}>VWAP (24Hr)</th>
            <th colSpan={1}>Supply</th>
            <th colSpan={1}>Volume (24Hr)</th>
            <th colSpan={1}>Change (24Hr)</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <th colSpan={8}>Loading...</th>
            </tr>
          )}
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
                  <TableRow
                    key={id}
                    rank={rank}
                    name={name}
                    symbol={symbol}
                    priceUsd={priceUsd}
                    marketCapUsd={marketCapUsd}
                    vwap24Hr={vwap24Hr}
                    supply={supply}
                    volumeUsd24Hr={volumeUsd24Hr}
                    changePercent24Hr={changePercent24Hr}
                  />
                );
              }
            )}
        </tbody>
      </table>
      <button>View More</button>
    </div>
  );
};

export { Main };
