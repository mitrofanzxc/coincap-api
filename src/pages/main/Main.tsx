import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useGetAssetsQuery } from '../../services/coincap';
import { TableHead, TableRow, ButtonPrimary, ModalAdd } from '../../components';
import './Main.scss';

const Main: FC = () => {
  const [limit, setLimit] = useState<number>(20);

  const isModalAddOpen = useAppSelector(({ modalAddToggle }) => modalAddToggle.value);
  const dispatch = useAppDispatch();

  const { data: assets, isLoading } = useGetAssetsQuery({ limit: limit });

  const increaseLimit = () => {
    setLimit(limit + 20);
  };

  return (
    <div>
      <table className="table">
        <TableHead />
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
                    id={id}
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
      <ButtonPrimary description="View More" onClick={increaseLimit} />
      <ModalAdd />
    </div>
  );
};

export { Main };
